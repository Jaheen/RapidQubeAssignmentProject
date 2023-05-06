cd backend
npm install
mkdir public
npm run build
cd ..
cd frontend
npm install
npm run build
mv ./build/* ../backend/public