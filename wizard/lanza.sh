#!/bin/bash
cd "$(dirname "$0")"
npm install
npm audit
npm audit fix --force
npm run dev
