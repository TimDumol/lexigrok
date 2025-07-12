# Use the official Python image.
# Make sure to use the same version as in `backend/.python-version`
FROM python:3.12-slim as base

# Install uv
FROM base as uv-install
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates
ADD https://astral.sh/uv/install.sh /uv-installer.sh
RUN sh /uv-installer.sh
ENV PATH="/root/.local/bin/:$PATH"

# Install dependencies
FROM uv-install as deps
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --locked

# Final image
FROM base as final
WORKDIR /app
COPY --from=deps /app/.venv /app/.venv
COPY . .
ENV PATH="/app/.venv/bin:$PATH"
EXPOSE 8000
CMD ["uv", "run", "--host", "0.0.0.0", "--port", "8000", "app.main:app"]
