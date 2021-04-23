import {css} from 'lit-element'

const cssStr = css`

:host {
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    justify-content: center;
}
.gauge {
  // width: 100%;
  flex: auto;
  max-width: 250px;
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  color: #004033;
  margin: 10px;
}

.gauge__body {
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background: #b4c0be;
  position: relative;
  border-top-left-radius: 100% 200%;
  border-top-right-radius: 100% 200%;
  overflow: hidden;
}

.gauge__fill {
  position: absolute;
  top: 100%;
  left: 0;
  width: inherit;
  height: 100%;
  background: #009578;
  transform-origin: center top;
  transform: rotate(0.25turn);
  transition: transform 0.2s ease-out;
}

.gauge__cover {
  width: 65%;
  top: 35%;

  height: 150%;
  background: #ffffff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  /* Text */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 25%;
  box-sizing: border-box;
}

.gauge__suffix {
    position: relative;
    bottom: 5px;
    font-size: 0.6em;
    margin-left: 3px;
}

.gauge__description{
	/* margin-top: 10px; */
	font-size: 14px;
	font-family: 'Roboto-Medium';
	/* text-transform: uppercase; */
    text-align: center;
}

`

export default cssStr
