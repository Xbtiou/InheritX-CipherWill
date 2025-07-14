#!/bin/bash

# Note: Use this script when you've InheritX dir as well on same root

# This script copy the generated declarations of Canisters from a InheritX dir to the current declarations dir

echo "Copying declarations from InheritX ... "

cd ../InheritX || true

cp -r declarations/ ../InheritX-UI/

#  check the exit status
if  cp -r declarations/ ../InheritX-UI/; then

    echo "Declarations copied successfully"

else
    echo "Command failed with exit status $?"

fi
