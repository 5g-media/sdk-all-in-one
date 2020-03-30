import React from 'react';
import { Container } from 'reactstrap';

import grafanaDashboard from 'assets/tutorial/grafanaDashboard.png';

export default function MonitoringTutorial() {
  return (
    <Container>
      <img
        src={grafanaDashboard}
        alt="GrafanaDashboard"
        style={{ width: '100%' }}
      />{' '}
      <br />
      <br />
      <p>
        <strong>Cluster CPU usage ($Node)</strong>
      </p>
      {/* <p>
          <em>
            sum (rate (container_cpu_usage_seconds_total
            {((id = "/"), (kubernetes_io_hostname = ~"^$Node$"))}
            [5m])) / sum (machine_cpu_cores
            {(kubernetes_io_hostname = ~"^$Node$")}) * 100
          </em>
        </p> */}
      <ul>
        <li>
          <span style={{ color: '#ff0000' }}>rate()</span> per-second average
          rate of increase of the time series in the range vector of last 5
          minutes.
        </li>
        <li>
          <span style={{ color: '#ff0000' }}>id="/"</span> - not a real
          container but a way to retrieve CPU from the node
        </li>
        <li>
          <span style={{ color: '#ff0000' }}>machine_cpu_cores</span> - number
          of cores in the node
        </li>
        <li>
          1st <span style={{ color: '#ff0000' }}>sum()</span> - sums usage
          across cores, 2nd <span style={{ color: '#ff0000' }}>sum()</span> sums
          cores
        </li>
        <li>
          <em>
            <strong>Output:</strong>
          </em>{' '}
          CPU percentage per selected Node
        </li>
      </ul>
      <p>
        <strong>Cluster MEM usage ($Node)</strong>
      </p>
      {/* <p>
          <em>
            sum (container_memory_working_set_bytes
            {((id = "/"), (kubernetes_io_hostname = ~"^$Node$"))}) / sum
            (machine_memory_bytes
            {(kubernetes_io_hostname = ~"^$Node$")}) * 100
          </em>
        </p> */}
      <ul>
        <li>
          A{' '}
          <span style={{ color: '#ff0000' }}>
            container_memory_working_set_bytes
          </span>{' '}
          (gauge)
        </li>
        <li>
          gauge: metric that represents a single numerical value that can
          arbitrarily go up and down
        </li>
        <li>
          <em>
            <strong>Output:</strong>
          </em>{' '}
          MEM percentage of a selected Node&nbsp;
        </li>
      </ul>
      <p>
        <strong>Network I/O pressure ($Node)</strong>
      </p>
      {/* <p>
          <em>
            sum (rate (container_network_receive_bytes_total
            {(kubernetes_io_hostname = ~"^$Node$")}
            [5m]))
          </em>
          <br />
          <em>
            sum (rate (container_network_transmit_bytes_total
            {(kubernetes_io_hostname = ~"^$Node$")}
            [5m]))
          </em>
        </p> */}
      <ul>
        <li>
          <em>
            <strong>Output:</strong>{' '}
          </em>
          Aggregated Network receive (bytes) per selected Node
        </li>
        <li>
          <em>
            <strong>Output:</strong>
          </em>{' '}
          Aggregated Network transmit (bytes) per selected Node
        </li>
      </ul>
      <p>
        <strong>Pods CPU usage</strong>
      </p>
      {/* <p>
          <em>
            sum (rate (container_cpu_usage_seconds_total
            {
              ((namespace = "$namespace"),
              image != "",
              (name = ~"^k8s_.*"),
              (kubernetes_io_hostname = ~"^$Node$"))
            }
            [5m])) by (pod_name)
          </em>
        </p> */}
      <ul>
        <li>
          <em>
            <strong>Output:</strong>
          </em>{' '}
          CPU 'cores' consumed by the k8s containers per selected Node and
          selected Namespace
        </li>
      </ul>
      <p>
        <strong>GPU Utilization</strong>
      </p>
      {/* <p>
          <em>avg_over_time(dcgm_gpu_utilization[5m])</em>
        </p> */}
      <ul>
        <li>
          <span style={{ color: '#ff0000' }}>dcgm_gpu_utilization</span> -
          percentage of GPU utilization as reported by NVIDIA DCGM
        </li>
        <li>
          <span style={{ color: '#ff0000' }}>avg_over_time</span> - the average
          value of all points in the specified interval
        </li>
        <li>
          <em>
            <strong>Output:</strong>
          </em>{' '}
          Avg GPU utilization percentage
        </li>
      </ul>
      <p>
        <strong>GPU Temp</strong>
      </p>
      {/* <p>
          <em>avg_over_time(dcgm_gpu_temp[5m])</em>
        </p> */}
      <ul>
        <li>
          <span style={{ color: '#ff0000' }}>dcgm_gpu_temp</span> - Temp (C) of
          of GPU
        </li>
        <li>
          <span style={{ color: '#ff0000' }}>avg_over_time</span> - the average
          value of all points in the specified interval
        </li>
        <li>
          <em>
            <strong>Output:</strong>
          </em>{' '}
          Avg GPU Temp (C)
        </li>
      </ul>
    </Container>
  );
}
