#!/bin/bash
#
# Springboard - Application skeleton for modern web development
#
# This script prepares the environment with the required Grunt dependencies.
# After running this script, use the grunt-cli tool to manage your application.
# See the README.md file for additional information.
#

GRUNT_PLUGINS="contrib-uglify contrib-clean bower-task bower-organiser contrib-less connect-rewrite connect-proxy contrib-connect contrib-watch contrib-copy contrib-jshint contrib-watch"
GRUNT_EXTRA_PLUGINS="connect-modrewrite"

echo "Installing Grunt Command Line Interface"
npm install -g grunt-cli

echo "Initializing NPM package file:"
npm init

echo "Installing Grunt:"
npm install --save-dev grunt

echo "Installing Grunt plugins:"
for PLUGIN in $GRUNT_PLUGINS
do
    npm install --save-dev "grunt-${PLUGIN}"
done

for PLUGIN in $GRUNT_EXTRA_PLUGINS
do
    npm install --save-dev $PLUGIN
done

echo "Done."

