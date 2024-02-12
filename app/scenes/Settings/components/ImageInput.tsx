import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { s } from "@shared/styles";
import Avatar, { AvatarSize, IAvatar } from "~/components/Avatar/Avatar";
import Flex from "~/components/Flex";
import ImageUpload, { Props as ImageUploadProps } from "./ImageUpload";

type Props = ImageUploadProps & {
  model: IAvatar;
};

export default function ImageInput({ model, ...rest }: Props) {
  const { t } = useTranslation();

  return (
    <ImageBox>
      <ImageUpload {...rest}>
        <StyledAvatar model={model} size={AvatarSize.XXLarge} />
        <Flex auto align="center" justify="center" className="upload">
          {t("Upload")}
        </Flex>
      </ImageUpload>
    </ImageBox>
  );
}

const avatarStyles = `
  width: 64px;
  height: 64px;
`;

const StyledAvatar = styled(Avatar)`
  border-radius: 8px;
`;

const ImageBox = styled(Flex)`
  ${avatarStyles};
  position: relative;
  font-size: 14px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px ${s("secondaryBackground")};
  background: ${s("background")};
  overflow: hidden;

  .upload {
    ${avatarStyles};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    cursor: var(--pointer);
    transition: all 250ms;
  }

  &:hover .upload {
    opacity: 1;
    background: rgba(0, 0, 0, 0.75);
    color: ${(props) => props.theme.white};
  }
`;
