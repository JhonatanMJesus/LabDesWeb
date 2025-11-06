import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Diretório onde as imagens serão salvas
const uploadDir = path.resolve(__dirname, '../../uploads');

// Cria a pasta se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
