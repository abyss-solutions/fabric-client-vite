## Local SSL setup

To run the project on `https://local.abyssfabric.co:3000/`, you need to create a self-signed SSL certificate for your local development environment.

### Step 1: Intall mkcert
```bash
brew install mkcert
sudo apt install mkcert
```

### Step 2: Install root certificate
```bash
mkcert -install
```

### Step 3: Create a local certificate
```bash
mkcert localhost
```