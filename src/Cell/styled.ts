import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  /* margin-top: 8px; */
  vertical-align: top;
  /* display: inline-block; */
  /* border-left: 1px solid #fff; */
  /* border-radius: 4px; */
  cursor: pointer;
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;

  button {
    /* font-size: 0.8em; */
    /* height: 80%; */
  }

  .buttons {
    display: grid;
    grid-auto-flow: column;
    gap: 4px;
    margin-left: 8px;
    /* position: absolute; */
    right: 0;
    top: 0;
    height: 100%;
    z-index: 10;
    background-color: var(--background-color);
    /* transform: translateX(calc(101%)); */
    transition: all 0.3s ease;
    /* &.edit {
      transform: none;
    } */
    /* overflow: hidden; */
    /* > button {
    } */
    /* background: red; */
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

  > span.metrics {
    display: flex;
    align-items: center;
  }

  > a {
    color: inherit;
    font-size: 1.1rem;
    text-decoration: none;
    font-weight: bold;

    > span {
      display: inline-flex;
      flex-direction: column;
      vertical-align: middle;

      > span:nth-child(2) {
        font-size: 0.8rem;
        opacity: 0.5;
      }
    }
  }

  img {
    width: 2rem;
    margin-right: 0.5em;
    vertical-align: middle;
  }

  span.price {
    font-weight: bold;
    font-size: 1.1rem;
    transition: all 0.1s linear;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    vertical-align: bottom;

    &.up {
      color: var(--up-color);
    }

    &.down {
      color: var(--down-color);
    }

    > span:nth-child(2) {
      font-size: 0.8rem;
      opacity: 0.5;
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
  /* border-bottom: 1px solid var(--border-color); */
  justify-content: space-between;
  display: flex;
  position: relative;
  overflow: hidden;
  height: 300px;
`;

export const ChartsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  .switch {
    display: flex;
    margin-right: 8px;

    > span {
      border: 1px solid transparent;
      flex-grow: 1;
      border-radius: 6px;
      padding: 2px 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &.selected {
        /* color: yellow; */
        border-color: #1fe230;
      }
    }
  }

  img {
    width: 100%;
  }
`;
