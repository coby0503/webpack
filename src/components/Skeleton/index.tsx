import React from "react";
import styled from "styled-components";

interface Props {}

const Skeleton: React.FC<Props> = () => {
  return (
    <SkeletonWrap>
      <SkeletonAnimation>스켈레톤인디용?</SkeletonAnimation>
    </SkeletonWrap>
  );
};
export default Skeleton;
const SkeletonWrap = styled.div`
  width: 200px;
  height: 200px;
`;

const SkeletonAnimation = styled.div`
  width: 100%;
  height: 100%;
`;
