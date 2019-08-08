#!/bin/bash
set -ex

ncu -u
 
(cd ./packages/fc-hotkeys && ncu -u)
(cd ./packages/fc-hotkeys-react && ncu -u)

