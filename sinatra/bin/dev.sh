DIRECTORY=$(cd `dirname $0` && pwd)
cd "$DIRECTORY/.."
nodemon --watch . --ext rb --exec "rackup"