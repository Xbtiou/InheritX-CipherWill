curl -sL -X POST \
-H 'Content-Type: application/json' \
https://icp0.io/registrations \
  --data @- <<EOF
{
  "name": "inheritx.aegisfinance.xyz"
}
EOF

# Request ID : e472a3ab969cdfa69c7d39e5e9a5d68e352676c405f75986026e441f1b98f637