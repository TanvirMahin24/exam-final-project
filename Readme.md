# Application Start
minikube start --driver=docker
minikube tunnel

# Kubernetes Secreat create
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=abcdabcd

# Open Grafana with prometheus
minikube service grafana-np --url
