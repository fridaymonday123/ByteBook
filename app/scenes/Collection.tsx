import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  useParams,
  Redirect,
  Switch,
  Route,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { s } from "@shared/styles";
import Collection from "~/models/Collection";
import Search from "~/scenes/Search";
import Badge from "~/components/Badge";
import CenteredContent from "~/components/CenteredContent";
import CollectionDescription from "~/components/CollectionDescription";
import Heading from "~/components/Heading";
import CollectionIcon from "~/components/Icons/CollectionIcon";
import InputSearchPage from "~/components/InputSearchPage";
import PlaceholderList from "~/components/List/Placeholder";
import PaginatedDocumentList from "~/components/PaginatedDocumentList";
import PinnedDocuments from "~/components/PinnedDocuments";
import PlaceholderText from "~/components/PlaceholderText";
import Scene from "~/components/Scene";
import Tab from "~/components/Tab";
import Tabs from "~/components/Tabs";
import Tooltip from "~/components/Tooltip";
import { editCollection } from "~/actions/definitions/collections";
import useCommandBarActions from "~/hooks/useCommandBarActions";
import useLastVisitedPath from "~/hooks/useLastVisitedPath";
import usePolicy from "~/hooks/usePolicy";
import useStores from "~/hooks/useStores";
import { collectionPath, updateCollectionPath } from "~/utils/routeHelpers";
import Actions from "./Collection/Actions";
import DropToImport from "./Collection/DropToImport";
import Empty from "./Collection/Empty";
import MembershipPreview from "./Collection/MembershipPreview";

function CollectionScene() {
  const params = useParams<{ id?: string }>();
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { documents, pins, collections, ui } = useStores();
  const [isFetching, setFetching] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();
  const currentPath = location.pathname;
  const [, setLastVisitedPath] = useLastVisitedPath();

  const id = params.id || "";
  const collection: Collection | null | undefined =
    collections.getByUrl(id) || collections.get(id);
  const can = usePolicy(collection);

  React.useEffect(() => {
    setLastVisitedPath(currentPath);
  }, [currentPath, setLastVisitedPath]);

  React.useEffect(() => {
    if (collection?.name) {
      const canonicalUrl = updateCollectionPath(match.url, collection);

      if (match.url !== canonicalUrl) {
        history.replace(canonicalUrl, history.location.state);
      }
    }
  }, [collection, collection?.name, history, id, match.url]);

  React.useEffect(() => {
    if (collection) {
      ui.setActiveCollection(collection.id);
    }

    return () => ui.setActiveCollection(undefined);
  }, [ui, collection]);

  React.useEffect(() => {
    setError(undefined);

    if (collection) {
      void pins.fetchPage({
        collectionId: collection.id,
      });
    }
  }, [pins, collection]);

  React.useEffect(() => {
    async function fetchData() {
      if ((!can || !collection) && !error && !isFetching) {
        try {
          setError(undefined);
          setFetching(true);
          await collections.fetch(id);
        } catch (err) {
          setError(err);
        } finally {
          setFetching(false);
        }
      }
    }

    void fetchData();
  }, [collections, isFetching, collection, error, id, can]);

  useCommandBarActions(
    [editCollection],
    ui.activeCollectionId ? [ui.activeCollectionId] : undefined
  );

  if (!collection && error) {
    return <Search notFound />;
  }

  return collection ? (
    <Scene
      // Forced mount prevents animation of pinned documents when navigating
      // _between_ collections, speeds up perceived performance.
      key={collection.id}
      centered={false}
      textTitle={collection.name}
      left={
        collection.isEmpty ? undefined : (
          <InputSearchPage
            source="collection"
            placeholder={`${t("Search in collection")}…`}
            label={t("Search in collection")}
            collectionId={collection.id}
          />
        )
      }
      title={
        <>
          <CollectionIcon collection={collection} expanded />
          &nbsp;{collection.name}
        </>
      }
      actions={
        <>
          <MembershipPreview collection={collection} />
          <Actions collection={collection} />
        </>
      }
    >
      <DropToImport
        accept={documents.importFileTypes.join(", ")}
        disabled={!can.createDocument}
        collectionId={collection.id}
      >
        <CenteredContent withStickyHeader>
          {collection.isEmpty ? (
            <Empty collection={collection} />
          ) : (
            <>
              <HeadingWithIcon>
                <HeadingIcon collection={collection} size={40} expanded />
                {collection.name}
                {collection.isPrivate && (
                  <Tooltip
                    content={t(
                      "This collection is only visible to those given access"
                    )}
                    placement="bottom"
                  >
                    <Badge>{t("Private")}</Badge>
                  </Tooltip>
                )}
              </HeadingWithIcon>

              <PinnedDocuments
                pins={pins.inCollection(collection.id)}
                canUpdate={can.update}
              />
              <CollectionDescription collection={collection} />

              <Documents>
                <Tabs>
                  <Tab to={collectionPath(collection.path)} exact>
                    {t("Documents")}
                  </Tab>
                  <Tab to={collectionPath(collection.path, "updated")} exact>
                    {t("Recently updated")}
                  </Tab>
                  <Tab to={collectionPath(collection.path, "published")} exact>
                    {t("Recently published")}
                  </Tab>
                  <Tab to={collectionPath(collection.path, "old")} exact>
                    {t("Least recently updated")}
                  </Tab>
                  <Tab
                    to={collectionPath(collection.path, "alphabetical")}
                    exact
                  >
                    {t("A–Z")}
                  </Tab>
                </Tabs>
                <Switch>
                  <Route path={collectionPath(collection.path, "alphabetical")}>
                    <PaginatedDocumentList
                      key="alphabetical"
                      documents={documents.alphabeticalInCollection(
                        collection.id
                      )}
                      fetch={documents.fetchAlphabetical}
                      options={{
                        collectionId: collection.id,
                      }}
                    />
                  </Route>
                  <Route path={collectionPath(collection.path, "old")}>
                    <PaginatedDocumentList
                      key="old"
                      documents={documents.leastRecentlyUpdatedInCollection(
                        collection.id
                      )}
                      fetch={documents.fetchLeastRecentlyUpdated}
                      options={{
                        collectionId: collection.id,
                      }}
                    />
                  </Route>
                  <Route path={collectionPath(collection.path, "recent")}>
                    <Redirect
                      to={collectionPath(collection.path, "published")}
                    />
                  </Route>
                  <Route path={collectionPath(collection.path, "published")}>
                    <PaginatedDocumentList
                      key="published"
                      documents={documents.recentlyPublishedInCollection(
                        collection.id
                      )}
                      fetch={documents.fetchRecentlyPublished}
                      options={{
                        collectionId: collection.id,
                      }}
                      showPublished
                    />
                  </Route>
                  <Route path={collectionPath(collection.path, "updated")}>
                    <PaginatedDocumentList
                      key="updated"
                      documents={documents.recentlyUpdatedInCollection(
                        collection.id
                      )}
                      fetch={documents.fetchRecentlyUpdated}
                      options={{
                        collectionId: collection.id,
                      }}
                    />
                  </Route>
                  <Route path={collectionPath(collection.path)} exact>
                    <PaginatedDocumentList
                      documents={documents.rootInCollection(collection.id)}
                      fetch={documents.fetchPage}
                      options={{
                        collectionId: collection.id,
                        parentDocumentId: null,
                        sort: collection.sort.field,
                        direction: collection.sort.direction,
                      }}
                      showParentDocuments
                    />
                  </Route>
                </Switch>
              </Documents>
            </>
          )}
        </CenteredContent>
      </DropToImport>
    </Scene>
  ) : (
    <CenteredContent>
      <Heading>
        <PlaceholderText height={35} />
      </Heading>
      <PlaceholderList count={5} />
    </CenteredContent>
  );
}

const Documents = styled.div`
  position: relative;
  background: ${s("background")};
`;

const HeadingWithIcon = styled(Heading)`
  display: flex;
  align-items: center;

  ${breakpoint("tablet")`
    margin-left: -40px;
  `};
`;

const HeadingIcon = styled(CollectionIcon)`
  align-self: flex-start;
  flex-shrink: 0;
`;

export default observer(CollectionScene);
