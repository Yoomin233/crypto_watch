import axios from "axios";
import styled from "styled-components";

const instance = axios.create({
  headers: {
    Authorization: `Bearer 5fcb77e68787da1467daeea55f0dd01a017efdf3`,
  },
});

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
  /* position: absolute; */
  /* bottom: 0.5em; */
  width: 100%;
  font-size: 0.8em;
  a {
    &:visited {
      color: var(--text-color);
    }
  }
  .export {
    text-decoration: underline;
  }
`;

const Info = () => {
  const updateShortLink = () => {
    instance
      .patch("https://api-ssl.bitly.com/v4/bitlinks/bit.ly/3NOtY7t", {
        // long_url: window.location.href,
        // link: "https://blog.iccfish.com/2021/08/04/unlock-ssh-of-xiaomi-routers/",
        long_url: "https://google.com",
      })
      .then(({ data }) => {
        navigator.clipboard.writeText(data.link).then(() => {
          alert("Link Copied!");
        });
      });
  };
  // const getLink = () => {
  //   instance.get("https://api-ssl.bitly.com/v4/bitlinks/bit.ly/3NCMPSD");
  // };
  return (
    <Wrapper className={"info"}>
      <span>
        Data Source:{" "}
        <a href='https://coinmarketcap.com/' target='_blank' rel='noreferrer'>
          CoinMarketCap
        </a>
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>
        <a
          href='https://github.com/YueminHu/crypto_watch'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
      </span>
      &nbsp;&nbsp;&nbsp;
      <span className='export' onClick={updateShortLink}>
        Update
      </span>
      {/* <span className='export' onClick={getLink}>
        <button>Get</button>
      </span> */}
    </Wrapper>
  );
};

export default Info;
