- Git clone
- npm install di masing - masing service
- Konfigurasi host,port,username,password database anda di masing - masing service
- Import file .sql yang ada di masing - masing service di RDBMS anda
- Jalan kan masing-masing service di terminal berbeda
- Gunakan end point dari service API gateway dan sambungkan dengan endpoint dari masing - masing service
  ( contoh : http://localhost:3000/users/api/login) "http://localhost:3000/users" adalah endpoint API gateway, sementara "api/login" adalah endpoint login dari service   users (bisa dilihat file router.js dari masing - masing service untuk melihat endpoint service nya)
