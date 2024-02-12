import isEqual from "lodash/isEqual";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { Waypoint } from "react-waypoint";
import { CompositeStateReturn } from "reakit/Composite";
import { Pagination } from "@shared/constants";
import RootStore from "~/stores/RootStore";
import ArrowKeyNavigation from "~/components/ArrowKeyNavigation";
import DelayedMount from "~/components/DelayedMount";
import PlaceholderList from "~/components/List/Placeholder";
import withStores from "~/components/withStores";
import { dateToHeading } from "~/utils/date";

export interface PaginatedItem {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

type Props<T> = WithTranslation &
  RootStore & {
    fetch?: (
      options: Record<string, any> | undefined
    ) => Promise<T[] | undefined> | undefined;
    options?: Record<string, any>;
    heading?: React.ReactNode;
    empty?: React.ReactNode;
    loading?: React.ReactElement;
    items?: T[];
    className?: string;
    renderItem: (
      item: T,
      index: number,
      compositeProps: CompositeStateReturn
    ) => React.ReactNode;
    renderError?: (options: {
      error: Error;
      retry: () => void;
    }) => React.ReactNode;
    renderHeading?: (name: React.ReactElement<any> | string) => React.ReactNode;
    onEscape?: (ev: React.KeyboardEvent<HTMLDivElement>) => void;
  };

@observer
class PaginatedList<T extends PaginatedItem> extends React.Component<Props<T>> {
  @observable
  error?: Error;

  @observable
  isFetchingMore = false;

  @observable
  isFetching = false;

  @observable
  isFetchingInitial = !this.props.items?.length;

  @observable
  fetchCounter = 0;

  @observable
  renderCount = 15;

  @observable
  offset = 0;

  @observable
  allowLoadMore = true;

  componentDidMount() {
    void this.fetchResults();
  }

  componentDidUpdate(prevProps: Props<T>) {
    if (
      prevProps.fetch !== this.props.fetch ||
      !isEqual(prevProps.options, this.props.options)
    ) {
      this.reset();
      void this.fetchResults();
    }
  }

  reset = () => {
    this.offset = 0;
    this.allowLoadMore = true;
    this.renderCount = Pagination.defaultLimit;
    this.isFetching = false;
    this.isFetchingInitial = false;
    this.isFetchingMore = false;
  };

  @action
  fetchResults = async () => {
    if (!this.props.fetch) {
      return;
    }
    this.isFetching = true;
    const counter = ++this.fetchCounter;
    const limit = this.props.options?.limit ?? Pagination.defaultLimit;
    this.error = undefined;

    try {
      const results = await this.props.fetch({
        limit,
        offset: this.offset,
        ...this.props.options,
      });

      if (results && (results.length === 0 || results.length < limit)) {
        this.allowLoadMore = false;
      } else {
        this.offset += limit;
      }

      this.renderCount += limit;
      this.isFetchingInitial = false;
    } catch (err) {
      this.error = err;
    } finally {
      // only the most recent fetch should end the loading state
      if (counter >= this.fetchCounter) {
        this.isFetching = false;
        this.isFetchingMore = false;
      }
    }
  };

  @action
  loadMoreResults = async () => {
    // Don't paginate if there aren't more results or we’re currently fetching
    if (!this.allowLoadMore || this.isFetching) {
      return;
    }
    // If there are already cached results that we haven't yet rendered because
    // of lazy rendering then show another page.
    const leftToRender = (this.props.items?.length ?? 0) - this.renderCount;

    if (leftToRender > 0) {
      this.renderCount += Pagination.defaultLimit;
    }

    // If there are less than a pages results in the cache go ahead and fetch
    // another page from the server
    if (leftToRender <= Pagination.defaultLimit) {
      this.isFetchingMore = true;
      await this.fetchResults();
    }
  };

  render() {
    const {
      items = [],
      heading,
      auth,
      empty = null,
      renderHeading,
      renderError,
      onEscape,
    } = this.props;

    const showLoading =
      this.isFetching &&
      !this.isFetchingMore &&
      (!items?.length || (this.fetchCounter <= 1 && this.isFetchingInitial));

    if (showLoading) {
      return (
        this.props.loading || (
          <DelayedMount>
            <div className={this.props.className}>
              <PlaceholderList count={5} />
            </div>
          </DelayedMount>
        )
      );
    }

    if (items?.length === 0) {
      if (this.error && renderError) {
        return renderError({ error: this.error, retry: this.fetchResults });
      }

      return empty;
    }

    return (
      <>
        {heading}
        <ArrowKeyNavigation
          aria-label={this.props["aria-label"]}
          onEscape={onEscape}
          className={this.props.className}
        >
          {(composite: CompositeStateReturn) => {
            let previousHeading = "";
            return items.slice(0, this.renderCount).map((item, index) => {
              const children = this.props.renderItem(item, index, composite);

              // If there is no renderHeading method passed then no date
              // headings are rendered
              if (!renderHeading) {
                return children;
              }

              // Our models have standard date fields, updatedAt > createdAt.
              // Get what a heading would look like for this item
              const currentDate =
                item.updatedAt || item.createdAt || previousHeading;
              const currentHeading = dateToHeading(
                currentDate,
                this.props.t,
                auth.user?.language
              );

              // If the heading is different to any previous heading then we
              // should render it, otherwise the item can go under the previous
              // heading
              if (!previousHeading || currentHeading !== previousHeading) {
                previousHeading = currentHeading;
                return (
                  <React.Fragment key={item.id}>
                    {renderHeading(currentHeading)}
                    {children}
                  </React.Fragment>
                );
              }

              return children;
            });
          }}
        </ArrowKeyNavigation>
        {this.allowLoadMore && (
          <Waypoint key={this.renderCount} onEnter={this.loadMoreResults} />
        )}
      </>
    );
  }
}

export const Component = PaginatedList;

export default withTranslation()(withStores(PaginatedList));
