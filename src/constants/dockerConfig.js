export const TRANSCODER_TEST_IMAGE = 'docker5gmedia/vtranscoder-test';
export const VSPEECH_IMAGE = 'docker5gmedia/vspeech-profiling';
export const VCACHE_IMAGE = 'docker5gmedia/vcache-profiling';

export const vtranscoder = ({ ipAddress, inputPort, outputPort, configPort, frameToSend }) => ({
  Hostname: '',
  User: '',
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: false,
  OpenStdin: true,
  StdinOnce: false,
  Env: [
    `transcoder_ip=${ipAddress}`,
    `transcoder_config_message_port=${configPort}`,
    `transcoder_data_input_port=${inputPort}`,
    `transcoder_data_output_port=${outputPort}`,
    `frames_to_send=${frameToSend}`,
    'experiment_timeout=60',
    'transcoding_quality=1',
    'sending_fps=11',
    'use_gpu=0',
  ],
  Cmd: [''],
  Image: TRANSCODER_TEST_IMAGE,
});

export const vspeech = ({ ipAddress, inputPort }) => ({
  Hostname: '',
  User: '',
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: false,
  OpenStdin: true,
  StdinOnce: false,
  Env: [`HOST_IP=${ipAddress}`, `HOST_PORT=${inputPort}`],
  Cmd: [''],
  Image: VSPEECH_IMAGE,
});

export const vCache = ({ ipAddress, outputPort }) => ({
  Hostname: '',
  User: '',
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: false,
  OpenStdin: true,
  StdinOnce: false,
  Env: [`REACT_APP_SERVICE_IP=${ipAddress}`, `REACT_APP_CACHE_PORT=${outputPort}`],
  Cmd: [''],
  Image: VCACHE_IMAGE,
  ExposedPorts: { '3000/tcp': {} },
  HostConfig: {
    PortBindings: {
      '3000/tcp': [{ HostPort: '3002' }],
    },
  },
});

export const vCacheMulti = ({ ipAddress, outputPort }) => ({
  Hostname: '',
  User: '',
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: false,
  OpenStdin: true,
  StdinOnce: false,
  Env: [`REACT_APP_SERVICE_IP=${ipAddress}`, `REACT_APP_CACHE_PORT=${outputPort}`],
  Cmd: [''],
  Image: VCACHE_IMAGE,
});
