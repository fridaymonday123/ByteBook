import { observer } from "mobx-react";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import styled, { DefaultTheme } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { s } from "@shared/styles";
import Flex from "~/components/Flex";
import { LoadingIndicatorBar } from "~/components/LoadingIndicator";
import SkipNavContent from "~/components/SkipNavContent";
import SkipNavLink from "~/components/SkipNavLink";
import env from "~/env";
import useAutoRefresh from "~/hooks/useAutoRefresh";
import useKeyDown from "~/hooks/useKeyDown";
import { MenuProvider } from "~/hooks/useMenuContext";
import useStores from "~/hooks/useStores";
import { isModKey } from "~/utils/keyboard";

type Props = {
  children?: React.ReactNode;
  title?: string;
  sidebar?: React.ReactNode;
  sidebarRight?: React.ReactNode;
};

const Layout: React.FC<Props> = ({
  title,
  children,
  sidebar,
  sidebarRight,
}: Props) => {
  const { ui } = useStores();
  const sidebarCollapsed = !sidebar || ui.sidebarIsClosed;

  useAutoRefresh();

  useKeyDown(".", (event) => {
    if (isModKey(event)) {
      ui.toggleCollapsedSidebar();
    }
  });

  return (
    <Container column auto>
      <Helmet>
        <title>{title ? title : env.APP_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <SkipNavLink />

      {ui.progressBarVisible && <LoadingIndicatorBar />}

      <Container auto>
        <MenuProvider>{sidebar}</MenuProvider>

        <SkipNavContent />
        <Content
          auto
          justify="center"
          $isResizing={ui.sidebarIsResizing}
          $sidebarCollapsed={sidebarCollapsed}
          $hasSidebar={!!sidebar}
          style={
            sidebarCollapsed
              ? undefined
              : {
                  marginLeft: `${ui.sidebarWidth}px`,
                }
          }
        >
          {children}
        </Content>

        {sidebarRight}
      </Container>
    </Container>
  );
};

const Container = styled(Flex)`
  background: ${s("background")};
  transition: ${s("backgroundTransition")};
  position: relative;
  width: 100%;
  min-height: 100%;
`;

type ContentProps = {
  $isResizing?: boolean;
  $sidebarCollapsed?: boolean;
  $hasSidebar?: boolean;
  theme: DefaultTheme;
};

const Content = styled(Flex)<ContentProps>`
  margin: 0;
  transition: ${(props) =>
    props.$isResizing ? "none" : `margin-left 100ms ease-out`};

  @media print {
    margin: 0 !important;
  }

  ${breakpoint("mobile", "tablet")`
    margin-left: 0 !important;
  `}

  ${breakpoint("tablet")`
    ${(props: ContentProps) =>
      props.$hasSidebar &&
      props.$sidebarCollapsed &&
      `margin-left: ${props.theme.sidebarCollapsedWidth}px;`}
  `};
`;

export default observer(Layout);
