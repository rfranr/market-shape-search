from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


class HelloResponse(BaseModel):
    message: str
    source: str


class DtwRequest(BaseModel):
    seriesA: list[float]
    seriesB: list[float]


class DtwResponse(BaseModel):
    distance: float


app = FastAPI(title="Backend DTW")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"status": "Backend DTW Python en marxa", "engine": "FastAPI"}


@app.get("/hello", response_model=HelloResponse)
def hello() -> HelloResponse:
    return HelloResponse(message="HelloWorld des del backend DTW 🐍", source="backend-dtw")


@app.post("/dtw", response_model=DtwResponse)
def calculate_dtw(request: DtwRequest) -> DtwResponse:
    return DtwResponse(distance=dtw_distance(request.seriesA, request.seriesB))


def dtw_distance(series_a: list[float], series_b: list[float]) -> float:
    n = len(series_a)
    m = len(series_b)

    if n == 0 or m == 0:
        return 0.0

    matrix = [[float("inf")] * (m + 1) for _ in range(n + 1)]
    matrix[0][0] = 0.0

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            cost = abs(series_a[i - 1] - series_b[j - 1])
            matrix[i][j] = cost + min(
                matrix[i - 1][j],
                matrix[i][j - 1],
                matrix[i - 1][j - 1],
            )

    return matrix[n][m]
