# Open Grafana with prometheus
minikube service grafana-np --url

# Application Start
minikube start --driver=docker
minikube tunnel

# Kubernetes Secreat create
kubectl create secret genetic jwt-secret --from-literal=JWT_KEY=abcdabcd