1. ### Use kubespray to install cluster k8s 
   - Edit file `inventory/mycluster/inventory.ini` place your IP address, user and hostname
   - Install
  
      ```ansible-playbook -i inventory/mycluster/inventory.ini cluster.yml --become --become-user=root -K -vvv```

2. Application (folder `app`)
  - Three steps:
    `Test` -> `Build` -> `Deploy`
    reference on `.gitlab-ci.yaml`
3. Database chart (folder `mongodb-sharded`)
- You can find other databases chart like: postgresql, mysql... available [here](https://hub.helm.sh/)
3. Redis-ha chard (folder `redis-ha`)
  - Same with databases, you can find more chart with install cache for your system: kafka, memcache...