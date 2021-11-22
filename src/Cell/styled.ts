import styled from "styled-components";

export const Wrapper = styled.div`
  display: inline-block;
  padding: 6px 8px;
  /* margin-top: 8px; */
  width: calc(50%);
  vertical-align: top;
  /* display: inline-block; */
  /* border-left: 1px solid #fff; */
  /* border-radius: 4px; */
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  border-bottom: 1px solid var(--border-color);
  @media screen and (max-width: 450px) {
    white-space: nowrap;
    width: 100%;
    /* overflow: hidden; */
  }
`;

export const CellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* &:hover {
    transform: translateY(-2px);
  } */
  @media screen and (max-width: 450px) {
    > a:first-child {
      max-width: 45vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > a {
    color: inherit;
    font-size: 1.1em;
    text-decoration: none;
    font-weight: bold;
  }
  img {
    width: 2rem;
    margin-right: 0.5em;
    vertical-align: middle;
  }
  span.price {
    font-weight: bold;
    font-size: 1.2em;
    transition: all 0.1s linear;
    &.up {
      color: var(--up-color);
    }
    &.down {
      color: var(--down-color);
    }
  }
  span.percentage {
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    margin-left: 12px;
    display: inline-block;
    text-align: center;
    /* width: 4.5em; */
  }
`;

export const MoreSection = styled.div`
  padding-top: 8px;
  /* border-bottom: 1px solid var(--border-color); */
  justify-content: space-between;
  display: flex;
  button {
    font-size: 0.8em;
  }
  .buttons {
    display: grid;
    gap: 4px;
    margin-left: 8px;
  }
`;

export const ChartsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  .switch {
    display: grid;
    margin-right: 8px;
    > span {
      border: 1px solid transparent;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      padding: 2px 8px;
      border-right-color: #1fe230;
      &.selected {
        /* color: yellow; */
        border-color: #1fe230;
        border-right-color: transparent;
      }
    }
  }
  img {
    width: 100%;
  }
`;
