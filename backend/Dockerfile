FROM ghcr.io/astral-sh/uv:0.7-python3.13-bookworm-slim

ENV UV_COMPILE_BYTECODE=1

WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project

COPY . /app
ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 8000
CMD ["uv", "run", "uvicorn", "--host", "0.0.0.0", "--port", "8000", "lexigrok.main:app"]
