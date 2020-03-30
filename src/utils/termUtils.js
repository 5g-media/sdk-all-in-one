import { Terminal } from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as fit from 'xterm/lib/addons/fit/fit';

import { xterm } from 'constants/clientConfig';
import { getConfig } from './configUtils';

import 'xterm/dist/xterm.css';

Terminal.applyAddon(attach);
Terminal.applyAddon(fit);

const getTermConfig = async () => {
  const configRes = await getConfig();
  const { config } = configRes;

  const configg = localStorage.getItem('isAdmin') === 'true' ? config.admin : config.developer;
  return configg;
};

export async function getTerminal(termElm, type) {
  const term = new Terminal({});
  const config = await getTermConfig();
  const xtermServerIp = type === 'osm' ? config.editor.editor_url : config.leanOwCLI.leanOW_IP;
  const xtermConfig = xterm({
    xtermServerIp,
    xtermServerPort: '8333',
    xtermCols: term.cols,
    xtermRows: term.rows,
  });

  const { serverUrl, sockerUrl } = xtermConfig;
  const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
  let socketURL = protocol + sockerUrl;

  term.open(termElm);
  term.setOption('cursorBlink', true);
  term.setOption('fontSize', 14);
  term.fit(termElm);

  const res = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type }),
  });

  const processId = await res.text();
  socketURL += processId;
  const socket = new WebSocket(socketURL);

  socket.onopen = () => {
    term.attach(socket);
    // eslint-disable-next-line no-underscore-dangle
    term._initialized = true;
  };

  return { processId, term };
}

export const createTerminal = async ({ termElm }) => {
  const term = new Terminal({});

  term.open(termElm);
  term.setOption('cursorBlink', true);
  term.setOption('fontSize', 14);
  term.fit(termElm);

  return term;
};

export const createTerminalSession = async ({ type }) => {
  const config = await getTermConfig();
  const xtermServerIp = type === 'osm' ? config.editor.editor_url : config.leanOwCLI.leanOW_IP;
  const xtermConfig = xterm({
    xtermServerIp,
    xtermServerPort: '8333',
    xtermCols: '',
    xtermRows: '',
  });

  const { serverUrl } = xtermConfig;

  const res = await fetch(serverUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type }),
  });

  const processId = await res.text();
  return processId;
};

export const openTerminalSession = async ({ term, type, processId }) => {
  const config = await getTermConfig();
  const xtermServerIp = type === 'osm' ? config.editor.editor_url : config.leanOwCLI.leanOW_IP;
  const xtermConfig = xterm({
    xtermServerIp,
    xtermServerPort: '8333',
    xtermCols: '',
    xtermRows: '',
  });

  const { sockerUrl } = xtermConfig;
  const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
  let socketURL = protocol + sockerUrl;
  socketURL += processId;
  const socket = new WebSocket(socketURL);

  socket.onopen = () => {
    term.attach(socket);
    // eslint-disable-next-line
    term._initialized = true;
  };

  return term;
};

export const resizeTerminal = async ({ term, xtermServerIp, processId }) => {
  const { resizeUrl } = xterm({
    xtermServerIp,
    xtermServerPort: '8333',
    xtermCols: term.cols,
    xtermRows: term.rows,
    processId,
  });

  await fetch(resizeUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pid: processId }),
  });
};
