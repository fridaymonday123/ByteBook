import { observer } from "mobx-react";
import * as React from "react";
import Flex from "~/components/Flex";

import styled from "styled-components";
import Input from "./Input";
import { depths, s } from "@shared/styles";
import { client } from "~/utils/ApiClient";
import { useEditor } from "./EditorContext";
import Image from "@shared/editor/components/Img";
import env from "~/env";

type Props = {
  active?: boolean;
  trigger: string;
  onClose: (active?: boolean) => void;
};


function GptResearch(props: Props) {
  const { view, commands } = useEditor();
  const { active } = props
  const gtpRef = React.useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = React.useState<boolean>(true);

  const close = React.useCallback(() => {
    handleClearTrigger();
    props.onClose();
    view.focus();
  }, [props, view]);

  const handleLinkInputKeydown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();

      const value = event.currentTarget.value.trim();
      if (!value) {
        return;
      }
      console.log('>>>>>>>>>>>>>gpt research task', value)
      setLoaded(false)
      const research = async () => {
        const res = await client.post(env.GTP_RESEARCH_URL, {
          "task": value,
          "report_type": "research_report",
          "agent": "Auto Agent"
        });
        return res;
      };
      research().then(res => {
        const { dispatch } = view;
        dispatch(view.state.tr.insertText(res.output + " "));
        props.onClose();
        view.focus();
      }).catch(error => {
        console.error('Error: ', error)
      }).finally(() => {
        setLoaded(true)
      })
    }


    if (event.key === "Escape") {
      close();
    }
  };

  const handleClearTrigger = React.useCallback(() => {
    const { state, dispatch } = view;
    const trigger = " "
    const poss = state.doc.cut(
      state.selection.from - (trigger ?? "").length - props.trigger.length,
      state.selection.from
    );
    const trimTrigger = poss.textContent.startsWith(props.trigger);

    if (!trigger && !trimTrigger) {
      return;
    }

    // clear search input
    dispatch(
      state.tr.insertText(
        "",
        Math.max(
          0,
          state.selection.from -
          (trigger ?? "").length -
          (trimTrigger ? props.trigger.length : 0)
        ),
        state.selection.to
      )
    );
  }, [props.trigger, view]);


  React.useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        !gtpRef.current ||
        gtpRef.current.contains(event.target as Element)
      ) {
        return;
      }

      close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) {
        return;
      }
      if (!props.active) {
        return;
      }

      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("keydown", handleKeyDown, {
      capture: true,
    });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
    };
  }, [close, props]);

  return (
    active ? (<Wrapper ref={gtpRef}>
      <Flex align="center">
        <Img src="/images/gpt-research.png" alt="gpt-research" />
        {loaded ? (<Flex align="center" style={{ width: '100%' }}><GptInput
          placeholder="Ask GptResearch to write anything..."
          onKeyDown={handleLinkInputKeydown}
          autoFocus
        />
          <Img src="/images/gpt-confirm.png" alt="gpt-confirm" /></Flex>)
          :
          <Loading>AI is writing…</Loading>}
      </Flex>
    </Wrapper>
    ) : null)
}
const Wrapper = styled.div`
  padding: 5px 8px 0px 8px;
  width:100%;
  height: 36px;
  border-radius: 6px; 
  background: ${s("menuBackground")};
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.08) 0px 4px 8px, rgba(0, 0, 0, 0.08) 0px 2px 4px;
  overflow: hidden; 
  isolation: isolate;
`;

const GptInput = styled(Input)`
  height: 21px;
  width: 100%;
  color: ${s("textSecondary")};
  background:none;
`;

const Img = styled(Image)`
  border-radius: 2px;
  #background: #fff;
  #box-shadow: 0 0 0 1px #fff;
  margin: 4px;
  width: 18px;
  height: 18px;
`;

const Loading = styled(Flex)`
  display: flex;
  align-items: center;
  color: ${s("textSecondary")};
  font-weight: 500;
  font-size: 14px;
  padding: 0 16px;
`;
export default observer(GptResearch);
