# Template Monorepo HelloWorld

Estructura MVP amb Turborepo:

- `apps/frontend`: Next.js (UI)
- `apps/bff`: BFF en Node/Express
- `apps/backend-dtw`: Backend Python/FastAPI per càlcul DTW
- `packages/shared-types`: tipus TypeScript compartits

## Arrencada

Crea l'entorn aïllat de Python dins del backend DTW:

```bash
npm install
python3 -m venv apps/backend-dtw/.venv
apps/backend-dtw/.venv/bin/python -m pip install --upgrade pip
apps/backend-dtw/.venv/bin/python -m pip install -r apps/backend-dtw/requirements.txt
npm run dev
```

`npm run dev` executa `turbo dev` i aixeca tots els serveis del monorepo. La part Python funciona perquè `apps/backend-dtw/package.json` crida l'executable del seu propi `.venv`:

```json
{
  "scripts": {
    "dev": "./.venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000"
  }
}
```

> Windows: el path seria `.venv\\Scripts\\uvicorn`.

## Nota sobre SciPy / fastdtw

Perquè el template HelloWorld funcioni bé amb Python 3.13, el backend DTW fa servir una implementació DTW mínima en Python pur i només instal·la `fastapi` + `uvicorn`. Paquets com `scipy==1.13.1` poden intentar compilar-se i fallar si no tens `gfortran` o si no hi ha wheel per la teva versió de Python.

Quan calgui optimitzar el càlcul DTW, podem afegir dependències numèriques compatibles amb la versió exacta de Python del projecte.

## Serveis

- Frontend: http://localhost:3000
- BFF: http://localhost:3001
- Backend DTW: http://localhost:8000

## Endpoints de prova

- `GET http://localhost:3001/api/hello`
- `POST http://localhost:3001/api/dtw`
- `GET http://localhost:8000/`
- `GET http://localhost:8000/hello`
- `POST http://localhost:8000/dtw`
