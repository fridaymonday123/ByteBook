import emojiRegex from "emoji-regex";
import { observer } from "mobx-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { s } from "@shared/styles";
import User from "~/models/User";
import Avatar from "~/components/Avatar";
import { useDocumentContext } from "~/components/DocumentContext";
import DocumentViews from "~/components/DocumentViews";
import Flex from "~/components/Flex";
import ListItem from "~/components/List/Item";
import PaginatedList from "~/components/PaginatedList";
import Switch from "~/components/Switch";
import Text from "~/components/Text";
import Time from "~/components/Time";
import useKeyDown from "~/hooks/useKeyDown";
import usePolicy from "~/hooks/usePolicy";
import useStores from "~/hooks/useStores";
import useTextSelection from "~/hooks/useTextSelection";
import { documentPath } from "~/utils/routeHelpers";
import Sidebar from "./SidebarLayout";

function Insights() {
  const { views, documents } = useStores();
  const { t } = useTranslation();
  const match = useRouteMatch<{ documentSlug: string }>();
  const history = useHistory();
  const selectedText = useTextSelection();
  const document = documents.getByUrl(match.params.documentSlug);
  const { editor } = useDocumentContext();
  const text = editor?.getPlainText();
  const stats = useTextStats(text ?? "", selectedText);
  const can = usePolicy(document);
  const documentViews = document ? views.inDocument(document.id) : [];

  const onCloseInsights = () => {
    if (document) {
      history.push(documentPath(document));
    }
  };

  useKeyDown("Escape", onCloseInsights);

  return (
    <Sidebar title={t("Insights")} onClose={onCloseInsights}>
      {document ? (
        <Flex
          column
          shrink={false}
          style={{ minHeight: "100%" }}
          justify="space-between"
        >
          <div>
            <Content column>
              <Heading>{t("Stats")}</Heading>
              <Text type="secondary" size="small">
                <List>
                  {stats.total.words > 0 && (
                    <li>
                      {t(`{{ count }} minute read`, {
                        count: stats.total.readingTime,
                      })}
                    </li>
                  )}
                  <li>
                    {t(`{{ count }} words`, { count: stats.total.words })}
                  </li>
                  <li>
                    {t(`{{ count }} characters`, {
                      count: stats.total.characters,
                    })}
                  </li>
                  <li>
                    {t(`{{ number }} emoji`, { number: stats.total.emoji })}
                  </li>
                  {stats.selected.characters === 0 ? (
                    <li>{t("No text selected")}</li>
                  ) : (
                    <>
                      <li>
                        {t(`{{ count }} words selected`, {
                          count: stats.selected.words,
                        })}
                      </li>
                      <li>
                        {t(`{{ count }} characters selected`, {
                          count: stats.selected.characters,
                        })}
                      </li>
                    </>
                  )}
                </List>
              </Text>
            </Content>
            {document.insightsEnabled && (
              <>
                <Content column>
                  <Heading>{t("Contributors")}</Heading>
                  <Text type="secondary" size="small">
                    {t(`Created`)}{" "}
                    <Time dateTime={document.createdAt} addSuffix />.
                    <br />
                    {t(`Last updated`)}{" "}
                    <Time dateTime={document.updatedAt} addSuffix />.
                  </Text>
                  <ListSpacing>
                    <PaginatedList
                      aria-label={t("Contributors")}
                      items={document.collaborators}
                      renderItem={(model: User) => (
                        <ListItem
                          key={model.id}
                          title={model.name}
                          image={<Avatar model={model} size={32} />}
                          subtitle={
                            model.id === document.createdBy.id
                              ? t("Creator")
                              : model.id === document.updatedBy.id
                              ? t("Last edited")
                              : t("Previously edited")
                          }
                          border={false}
                          small
                        />
                      )}
                    />
                  </ListSpacing>
                </Content>
                <Content column>
                  <Heading>{t("Views")}</Heading>
                  <Text type="secondary" size="small">
                    {documentViews.length <= 1
                      ? t("No one else has viewed yet")
                      : t(
                          `Viewed {{ count }} times by {{ teamMembers }} people`,
                          {
                            count: documentViews.reduce(
                              (memo, view) => memo + view.count,
                              0
                            ),
                            teamMembers: documentViews.length,
                          }
                        )}
                    .
                  </Text>
                  {documentViews.length > 1 && (
                    <ListSpacing>
                      <DocumentViews document={document} isOpen />
                    </ListSpacing>
                  )}
                </Content>
              </>
            )}
          </div>
          {can.updateInsights && (
            <Manage>
              <Flex column>
                <Text size="small" weight="bold">
                  {t("Viewer insights")}
                </Text>
                <Text type="secondary" size="small">
                  {t(
                    "As an admin you can manage if team members can see who has viewed this document"
                  )}
                </Text>
              </Flex>
              <Switch
                checked={document.insightsEnabled}
                onChange={async (ev) => {
                  await document.save({
                    insightsEnabled: ev.currentTarget.checked,
                  });
                }}
              />
            </Manage>
          )}
        </Flex>
      ) : null}
    </Sidebar>
  );
}

function useTextStats(text: string, selectedText: string) {
  const numTotalWords = countWords(text);
  const regex = emojiRegex();
  const matches = Array.from(text.matchAll(regex));

  return {
    total: {
      words: numTotalWords,
      characters: text.length,
      emoji: matches.length ?? 0,
      readingTime: Math.max(1, Math.floor(numTotalWords / 200)),
    },
    selected: {
      words: countWords(selectedText),
      characters: selectedText.length,
    },
  };
}

function countWords(text: string): number {
  const t = text.trim();

  // Hyphenated words are counted as two words
  return t ? t.replace(/-/g, " ").split(/\s+/g).length : 0;
}

const Manage = styled(Flex)`
  background: ${s("background")};
  border: 1px solid ${s("inputBorder")};
  border-bottom-width: 2px;
  border-radius: 8px;
  margin: 16px;
  padding: 16px 16px 0;
  justify-self: flex-end;
`;

const ListSpacing = styled("div")`
  margin-top: -0.5em;
  margin-bottom: 0.5em;
`;

const List = styled("ul")`
  margin: 0;
  padding: 0;
  list-style: none;

  li:before {
    content: "·";
    display: inline-block;
    font-weight: 600;
    color: ${s("textTertiary")};
    width: 10px;
  }
`;

const Content = styled(Flex)`
  padding: 0 16px;
  user-select: none;
`;

const Heading = styled("h3")`
  font-size: 15px;
`;

export default observer(Insights);
