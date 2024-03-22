import invariant from "invariant";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { observer } from "mobx-react";
import { CopyIcon, GlobeIcon, InfoIcon } from "outline-icons";
import * as React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import styled, { useTheme } from "styled-components";
import { s } from "@shared/styles";
import { SHARE_URL_SLUG_REGEX } from "@shared/utils/urlHelpers";
import Document from "~/models/Document";
import Share from "~/models/Share";
import Input, { NativeInput } from "~/components/Input";
import Switch from "~/components/Switch";
import env from "~/env";
import usePolicy from "~/hooks/usePolicy";
import useStores from "~/hooks/useStores";
import { AvatarSize } from "../Avatar/Avatar";
import CopyToClipboard from "../CopyToClipboard";
import NudeButton from "../NudeButton";
import { ResizingHeightContainer } from "../ResizingHeightContainer";
import Squircle from "../Squircle";
import Text from "../Text";
import Tooltip from "../Tooltip";
import { StyledListItem } from "./MemberListItem";

type Props = {
  /** The document to share. */
  document: Document;
  /** The existing share model, if any. */
  share: Share | null | undefined;
  /** The existing share parent model, if any. */
  sharedParent: Share | null | undefined;
  /** Ref to the Copy Link button */
  copyButtonRef?: React.RefObject<HTMLButtonElement>;
  onRequestClose?: () => void;
};

function PublicAccess({ document, share, sharedParent }: Props) {
  const { shares } = useStores();
  const { t } = useTranslation();
  const theme = useTheme();
  const [validationError, setValidationError] = React.useState("");
  const [urlId, setUrlId] = React.useState(share?.urlId);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const can = usePolicy(share);
  const documentAbilities = usePolicy(document);
  const canPublish = can.update && documentAbilities.share;

  React.useEffect(() => {
    setUrlId(share?.urlId);
  }, [share?.urlId]);

  const handlePublishedChange = React.useCallback(
    async (event) => {
      const share = shares.getByDocumentId(document.id);
      invariant(share, "Share must exist");

      try {
        await share.save({
          published: event.currentTarget.checked,
        });
      } catch (err) {
        toast.error(err.message);
      }
    },
    [document.id, shares]
  );

  const handleUrlChange = React.useMemo(
    () =>
      debounce(async (ev) => {
        if (!share) {
          return;
        }

        const val = ev.target.value;
        setUrlId(val);
        if (val && !SHARE_URL_SLUG_REGEX.test(val)) {
          setValidationError(
            t("Only lowercase letters, digits and dashes allowed")
          );
        } else {
          setValidationError("");
          if (share.urlId !== val) {
            try {
              await share.save({
                urlId: isEmpty(val) ? null : val,
              });
            } catch (err) {
              if (err.message.includes("must be unique")) {
                setValidationError(t("Sorry, this link has already been used"));
              }
            }
          }
        }
      }, 500),
    [t, share]
  );

  const handleCopied = React.useCallback(() => {
    toast.success(t("Public link copied to clipboard"));
  }, [t]);

  const documentTitle = sharedParent?.documentTitle;

  const shareUrl = sharedParent?.url
    ? `${sharedParent.url}${document.url}`
    : share?.url ?? "";

  const copyButton = (
    <Tooltip content={t("Copy public link")} delay={500} placement="top">
      <CopyToClipboard text={shareUrl} onCopy={handleCopied}>
        <NudeButton type="button" disabled={!share} style={{ marginRight: 3 }}>
          <CopyIcon color={theme.placeholder} size={18} />
        </NudeButton>
      </CopyToClipboard>
    </Tooltip>
  );

  return (
    <Wrapper>
      <StyledListItem
        title={t("Web")}
        subtitle={
          <>
            {sharedParent && !document.isDraft ? (
              <Trans>
                Anyone with the link can access because the parent document,{" "}
                <StyledLink to={`/doc/${sharedParent.documentId}`}>
                  {{ documentTitle }}
                </StyledLink>
                , is shared
              </Trans>
            ) : (
              t("Allow anyone with the link to access")
            )}
          </>
        }
        image={
          <Squircle color={theme.text} size={AvatarSize.Medium}>
            <GlobeIcon color={theme.background} size={18} />
          </Squircle>
        }
        actions={
          sharedParent && !document.isDraft ? null : (
            <Switch
              aria-label={t("Publish to internet")}
              checked={share?.published ?? false}
              onChange={handlePublishedChange}
              disabled={!canPublish}
              width={26}
              height={14}
            />
          )
        }
      />

      <ResizingHeightContainer>
        {sharedParent?.published ? (
          <ShareLinkInput type="text" disabled defaultValue={shareUrl}>
            {copyButton}
          </ShareLinkInput>
        ) : share?.published ? (
          <ShareLinkInput
            type="text"
            ref={inputRef}
            placeholder={share?.id}
            onChange={handleUrlChange}
            error={validationError}
            defaultValue={urlId}
            prefix={
              <DomainPrefix
                readOnly
                onClick={() => inputRef.current?.focus()}
                value={env.URL.replace(/https?:\/\//, "") + "/s/"}
              />
            }
          >
            {copyButton}
          </ShareLinkInput>
        ) : null}

        {share?.published && !share.includeChildDocuments ? (
          <Text as="p" type="tertiary" size="xsmall">
            <StyledInfoIcon size={18} />
            <span>
              {t(
                "Nested documents are not shared on the web. Toggle sharing to enable access, this will be the default behavior in the future"
              )}
              .
            </span>
          </Text>
        ) : null}
      </ResizingHeightContainer>
    </Wrapper>
  );
}

const StyledInfoIcon = styled(InfoIcon)`
  vertical-align: bottom;
  margin-right: 2px;
`;

const Wrapper = styled.div`
  margin-bottom: 8px;
`;

const DomainPrefix = styled(NativeInput)`
  flex: 0 1 auto;
  padding-right: 0 !important;
  cursor: text;
  color: ${s("placeholder")};
  user-select: none;
`;

const ShareLinkInput = styled(Input)`
  margin-top: 12px;
  min-width: 100px;
  flex: 1;

  ${NativeInput}:not(:first-child) {
    padding: 4px 8px 4px 0;
    flex: 1;
  }
`;

const StyledLink = styled(Link)`
  color: ${s("textSecondary")};
  text-decoration: underline;
`;

export default observer(PublicAccess);
