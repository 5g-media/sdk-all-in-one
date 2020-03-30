cd ~/sdk/sdk-all-in-one/test/UC1/OSM

curl -H "Content-type: application/json" -POST -d '{"service_ports": ["18090", "18091", "18092"], "action_params": {"gpu_node":"0", "textures_codec": "0", "quality": "4"}}' http://127.0.0.1:5002/conf/sky_balls/vtranscoder_2_7_2_vnfd/1

wsk -i action create /guest/5g-media/vtranscoder_2_7_2 --docker docker5gmedia/transcoder_2_7_2

osm vnfd-create vtranscoder_2_7_2_vnfd.tar.gz

osm nsd-create vtranscoder_2_7_2_nsd.tar.gz

osm ns-create --nsd_name vtranscoder_2_7_2_nsd --ns_name sky_balls --vim_account FaaS_VIM

curl http://127.0.0.1:5002/osm/sky_balls/

osm ns-delete sky_balls


cd ~/sdk/sdk-all-in-one/test/UC2/OSM

osm vnfd-create rtmp-server_vnfd.tar.gz

osm vnfd-create vspeech_vnfd.tar.gz

osm nsd-create vspeech_nsd.tar.gz

osm ns-create --nsd_name vspeech_nsd --ns_name vspeech --vim_account emu_VIM

osm ns-delete vspeech


cd ~/sdk/sdk-all-in-one/test/UC3/OSM

osm vnfd-create originserver_vnfd.tar.gz

osm vnfd-create vcache_vnfd.tar.gz

osm nsd-create vcache_nsd.tar.gz

osm ns-create --nsd_name vcache_nsd --ns_name vcache --vim_account emu_VIM

osm ns-delete
