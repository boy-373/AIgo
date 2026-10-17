from setuptools import setup, find_packages

setup(
    name="aigo",
    version="1.0.0",
    description="Python SDK for AIgo open API (OpenAI-compatible chat, extract, credits)",
    author="AIgo",
    url="https://github.com/boy-373/quantoken-sdk",
    packages=find_packages(),
    install_requires=["requests>=2.25.0"],
    python_requires=">=3.8",
    license="MIT",
)
