# [5G-Media SDK Dev Stack](http://www.5gmedia.eu/)

## Prerequisites

Node v10.16.3 and Yarn v1.17.3

**1)** curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

**2)** sudo apt-get install nodejs

**3)** curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

**4)** echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

**5)** sudo apt-get update && sudo apt-get install yarn

Screen v4.03.01

**1)** sudo apt install screen

## Installation

## **OSM v5.0.5** ( [Installing OSM for 5G-MEDIA](https://production.eng.it/gitlab/5G-MEDIA/faas-vim-plugin/blob/all-on-one/vim-plugin/docs/install_osm_with_faas.md) )

**1)** wget https://osm-download.etsi.org/ftp/osm-5.0-five/install_osm.sh && chmod +x install_osm.sh && nano install_osm.sh

```
COMMENT LINE => #/usr/share/osm-devops/installers/full_install_osm.sh -R $RELEASE -r $REPOSITORY -u $REPOSITORY_BASE -D /usr/share/osm-devops -t latest "$@"
```

**2)** ./install_osm.sh

**3)** sudo nano /usr/share/osm-devops/installers/full_install_osm.sh

```
UPDATE => sudo apt-get install -y docker-ce=17.09.1~ce-0~ubuntu
```

**4)** nano install_osm.sh

```
  COMMENT LINE => #sudo DEBIAN_FRONTEND=noninteractive apt-get install osm-devops
  UNCOMMENT LINE => /usr/share/osm-devops/installers/full_install_osm.sh -R $RELEASE -r $REPOSITORY -u $REPOSITORY_BASE -D /usr/share/osm-devops -t latest "$@"
```

**5)** ./install_osm.sh -b tags/v5.0.5 --vimemu 2>&1 | tee osm_install_log.txt

**6)** sudo docker stack rm osm && sleep 60 && sudo nano /etc/osm/docker/docker-compose.yaml

- Replace image tags.
  Update them from `latest` --> `v5.0.5` for the following services: `lcm`, `mon`, `pol`, `light-ui`

- Update image for keystone
  ```
  keystone:
    image: docker5gmedia/keystone:v5.0.5
  ```
- Update image for nbi
  ```
  nbi:
    image: docker5gmedia/nbi:v5.0.5
  ```
- Update image and add environment variable for ro. Replace `10.10.10.10` with your ipaddress of your all-in-one VM.

  ```
  ro:
    image: docker5gmedia/ro:git_220e83e_faas_f819706
    environment:
      ...
      FAAS_CONF_CONNECT: http://10.10.10.10:5002
  ```

**7)** sudo docker volume rm osm_mongo_db osm_mon_db osm_ro_db osm_prom_db

**8)** sudo mkdir /etc/systemd/system/docker.service.d/ && sudo nano /etc/systemd/system/docker.service.d/startup_options.conf

- ADD FOLLOWING LINES

```
# /etc/systemd/system/docker.service.d/override.conf

[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375
```

**9)** sudo systemctl daemon-reload && sudo systemctl restart docker.service

**10)** export OSM_UI_PORTS=8082:80 TAG=v5.0.5

**11)** sudo docker stack deploy -c /etc/osm/docker/docker-compose.yaml osm

**12)** WAIT => sudo docker stack ps osm | grep -i running

**13)** lxc config set core.https_address '[::]:8445'

**14)** export VIMEMU_HOSTNAME=\$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vim-emu)

**15)** osm vim-create --name emu_VIM --user username --password password --auth_url http://$VIMEMU_HOSTNAME:6001/v2.0 --tenant tenantName --account_type openstack

**16)** echo "export OSM_HOSTNAME=`10.10.10.10`" >> .bashrc

## **Lean OpenWhisk v2.0** ( [Installing Lean Openwhisk](https://production.eng.it/gitlab/5G-MEDIA/faas-vim-plugin/blob/all-on-one/sdk/efx/README.md) )

**0)** git clone -b all-on-one https://production.eng.it/gitlab/5G-MEDIA/faas-vim-plugin.git ~/sdk/faas-vim-plugin

**1)** git clone https://github.com/apache/incubator-openwhisk.git ~/openwhisk

**2)** nano ~/openwhisk/tools/ubuntu-setup/docker-xenial.sh

```
  COMMENT LINE => #sudo apt-get install -y docker-ce
```

**3)** (cd ~/openwhisk/tools/ubuntu-setup && ./all.sh)

**4)** cd ~/openwhisk && sudo ./gradlew distDocker

**9)** sudo apt-get install python-pip

**10)** sudo pip install ansible==2.5.2

**11)** sudo pip install jinja2==2.9.6

**12)** cd ~/openwhisk/ansible && sudo ansible-playbook setup.yml

**13)** sudo ansible-playbook prereq.yml

**14)** cd ~/openwhisk && sudo ./gradlew distDocker

**15)** cd ansible && sudo ansible-playbook couchdb.yml

**16)** sudo ansible-playbook initdb.yml

**17)** sudo ansible-playbook wipe.yml

**18)** sudo ansible-playbook openwhisk.yml -e lean=true

**19)** sudo ansible-playbook postdeploy.yml

**20)** sudo ansible-playbook apigateway.yml

**21)** sudo ansible-playbook routemgmt.yml

**22)** nano ~/.wskprops

- ADD FOLLOWING LINES Replace `10.10.10.10` with your ipaddress of your all-in-one VM.

```
APIHOST=https://10.10.10.10:443
NAMESPACE=guest
AUTH=23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP
```

**23)** sudo ln -s ~/openwhisk/bin/wsk /usr/local/bin/wsk

**TESTING**

```
wsk -i list
wsk -i package create test_package
wsk -i action create test_package/hello-action ~/openwhisk/tests/dat/actions/hello.py
wsk -i action invoke -r test_package/hello-action
```

Output:

```
{
    "greeting": "Hello stranger!"
}
```

## **Minikube v0.30.0** ( [Installing Minikube & Kubernetes](https://production.eng.it/gitlab/5G-MEDIA/faas-vim-plugin/blob/all-on-one/sdk/minikube/README.md) )

**1)** curl -Lo https://storage.googleapis.com/kubernetes-release/release/v1.12.2/bin/linux/amd64/kubectl && chmod +x ./kubectl && sudo mv ./kubectl /usr/local/bin/kubectl

**2)** curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.30.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/minikube

**3)** sudo apt-get install socat

**4)** sudo minikube start --vm-driver=none

**5)** sudo chown -R $USER $HOME/.kube && sudo chgrp -R $USER $HOME/.kube && sudo chown -R $USER $HOME/.minikube && sudo chgrp -R $USER $HOME/.minikube

**6)** sudo ip link set docker0 promisc on && sudo minikube status

**7)** cd ~/sdk/faas-vim-plugin/sdk/minikube/

**8)** sudo kubectl create -f roles.yml

**9)** sudo kubectl create -f offload.yml

**TESTING**

```
curl $(sudo minikube ip):$(sudo kubectl describe service ow-offloadservice | grep http-api | grep NodePort | awk '{print $3}' | cut -d'/' -f1)/hello
```

Output:

```
Greetings from the OpenWhisk offload server! OSM Version: N/A FaaS Version: 0.2.3
```

## **FaaS VIM plugin v2.0** ( [Installing FaaS configuration service](https://production.eng.it/gitlab/5G-MEDIA/faas-vim-plugin/blob/all-on-one/vim-plugin/README.md) )

**1)** cd ~/sdk/faas-vim-plugin/vim-plugin/configuration_service

**2)** screen -S faas-srv

**3)** sudo apt-get install -y python-dev

**4)** sudo apt-get install -y python-setuptools

**5)** sudo apt-get install -y python-pip

**6)** sudo pip install --upgrade pip

**7)** sudo pip install virtualenv

**8)** virtualenv .my-virtenv

**9)** source .my-virtenv/bin/activate

**10)** sudo pip install --upgrade pip

**11)** pip install -r requirements.txt

**12)** export OSM_RO_HOSTNAME=127.0.0.1 && export CONF_PORT=5002

**13)** source .my-virtenv/bin/activate

**14)** python faas_configuration_service.py

**15)** CLOSE TERMINAL or Ctrl + A, D

**16)** cd ~/sdk/faas-vim-plugin/openwhisk/actions/internal

**17)** mkdir openwhisk_wskdeploy && tar -C openwhisk_wskdeploy -xzvf openwhisk_wskdeploy-0.10.0-incubating-linux-amd64.tgz && ./openwhisk_wskdeploy/wskdeploy -m manifest.yaml

**18)** sudo ln -s ~/sdk/faas-vim-plugin/openwhisk/actions/internal/openwhisk_wskdeploy/ /usr/local/bin/wskdeploy

**19)** osm vim-create --name FaaS_VIM --auth_url "https://`10.10.10.10`:443" --tenant whisk --account_type faas --config '{offload-service-url: "http://`10.10.10.10`:31414", offload-action: "/guest/k8s_pkg/offload", auth_token: "23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP"}'

**TESTING**

```
curl http://127.0.0.1:5002/tenants
```

Output

```
{
  "tenants": [
    {
      "created_at": "2019-09-23T15:11:03",
      "description": null,
      "name": "osm",
      "uuid": "0c62d8d8-050a-4384-8ee2-c4cf23c0e9b0"
    }
  ]
}
```

## **5G Apps & Services Catalogue v3.1** ( [Installing catalogue](https://github.com/nextworks-it/5g-catalogue/blob/master/README.md) )

**1)** git clone https://github.com/nextworks-it/5g-catalogue.git ~/sdk/5g-catalogue && cd ~/sdk/5g-catalogue/ && git checkout tags/v3.1.2

**2)** cd deployments/docker/ && nano .env

```
UPDATE => CATALOGUE_GUI_PORT=8090
UPDATE => CATALOGUE_PROFILE=5gmedia
UPDATE => CATALOGUE_SCOPE=PRIVATE
UPDATE => PUBLIC_CATALOGUE_URL=http://217.172.11.171:8083/
UPDATE => MANO_TYPE=OSMR5
UPDATE => MANO_IP=10.10.10.10
```

**3)** sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose

**4)** sudo docker-compose -f "docker-compose.yml" up -d --build

## **xterm server v1.0.0** ( [Installing xterm-server](https://github.com/5g-media/xterm-server/blob/master/README.md) )

**0)** git clone https://github.com/5g-media/xterm-server.git ~/sdk/xterm-server && cd ~/sdk/xterm-server/

**1)** mkdir ~/sdk/tutorials && mkdir ~/sdk/tutorials/osm && mkdir ~/sdk/tutorials/leanow && yarn install

**2)** screen -S xterm

**3)** yarn start-server

**4)** CLOSE TERMINAL or Ctrl + A, D

## **Cognitive Network Optimiser v1.0.0** ( [Installation of CNO for UC2](https://github.com/mkheirkhah/5gmedia/blob/deployed/cno/README.md) )

**1)** sudo apt-get install build-essential checkinstall

**2)** sudo apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

**3)** cd /usr/src && sudo wget https://www.python.org/ftp/python/3.5.6/Python-3.5.6.tgz && sudo tar xzf Python-3.5.6.tgz && rm Python-3.5.6.tgz

**4)** cd Python-3.5.6

**5)** sudo ./configure --enable-optimizations

**6)** sudo make altinstall

**7)** TEST => python3.5 -V

Output

```
Python 3.5.2
```

**8)** pip install virtualenv virtualenvwrapper

**9)** virtualenv --python=/usr/local/bin/python3.5 ~/virtualenv/pillow2

**10)** source ~/virtualenv/pillow2/bin/activate

**11)**pip install tflearn tensorflow matplotlib

**12)**pip install tensorflow==1.5.0

**13)**pip install tensorboard==1.12.0

**14)**git clone -b deployed https://github.com/mkheirkhah/5gmedia.git ~/5gmedia

## **5G-Media All in One SDK UI Backend v1.0.0** ( [Installing backend server of AIO User Interface](https://github.com/5g-media/All-in-one-ui-backend/blob/master/README.md) )

**0)** git clone https://github.com/5g-media/All-in-one-ui-backend.git ~/sdk/all-in-one-ui-backend/ && cd ~/sdk/all-in-one-ui-backend/

**1)** sudo apt install -y maven

**2)** mvn -Dmaven.test.skip=true package

**3)** nohup java -jar target/PackageService-0.0.1-SNAPSHOT.jar &

## **5G-MEDIA AIO User Interface v1.1.0** ( [Installing User Interface](https://github.com/5g-media/sdk-all-in-one/blob/master/README.md) )

**0)** git clone https://github.com/5g-media/sdk-all-in-one.git ~/sdk/sdk-all-in-one

**1)** cd ~/sdk/sdk-all-in-one/ && yarn install

**2)** nano .env

```
UPDATE => REACT_APP_AIO_SERVER_IP=10.10.10.10 (IP address of All in One SDK UI Backend)
```

**3)** screen -S sdk-aio

**4)** yarn start

**5)** CLOSE TERMINAL or Ctrl + A, D

## **RESTART STEPS OF DEVSTACK**

You need to follow these steps whenever the machine is restarted

**1)** cd ~/openwhisk/ansible

**2)** sudo ansible-playbook openwhisk.yml -e lean=true

**3)** cd ~/sdk/all-in-one-ui-backend/ && ./restart

**4)** cd ~/sdk/xterm-server/ && screen -S xterm

**5)** yarn start-server

**6)** CLOSE TERMINAL or Ctrl + A, D

**7)** cd ~/sdk/5g-catalogue/deployments/docker/

**8)** sudo docker-compose -f "docker-compose.yml" up -d

**9)** docker start grafana

**10)** cd ~/sdk/sdk-all-in-one/ && screen -S sdk-aio

**11)** yarn start

**12)** CLOSE TERMINAL or Ctrl + A, D

**13)** cd ~/sdk/monitoring && docker-compose up -d

**14)** screen -S faas-srv

**15)** export OSM_RO_HOSTNAME=127.0.0.1 && export CONF_PORT=5002

**16)** cd ~/sdk/faas-vim-plugin/vim-plugin/configuration_service && source .my-virtenv/bin/activate

**17)** python faas_configuration_service.py

**18)** CLOSE TERMINAL or Ctrl + A, D

**19)** sudo kubectl describe service ow-offloadservice | grep http-api | grep NodePort| awk '{print \$3}' | cut -d'/' -f1

**20)** osm vim-delete emu_VIM && osm vim-delete FaaS_VIM && osm vim-list

**21)** export VIMEMU_HOSTNAME=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vim-emu) && echo $VIMEMU_HOSTNAME

**22)** osm vim-create --name emu_VIM --user username --password password --auth_url http://$VIMEMU_HOSTNAME:6001/v2.0 --tenant tenantName --account_type openstack

**23)** osm vim-create --name FaaS_VIM --auth_url "https://10.10.10.10:443" --tenant whisk --account_type faas --config '{offload-service-url: "http://10.10.10.10:31579", offload-action: "/guest/k8s_pkg/offload", auth_token: "23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP"}'
