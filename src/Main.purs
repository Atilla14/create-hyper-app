module Main where

import Prelude

import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log, logShow)
import Control.Monad.Eff.Exception (EXCEPTION)
import Control.Monad.Except (except)
import Data.Array (foldl, reverse)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Node.Buffer (Buffer, toString, BUFFER)
import Node.ChildProcess (CHILD_PROCESS, defaultExecOptions, exec, onError)
import Node.Encoding (Encoding(..))
import Node.Yargs.Applicative (flag, yarg, runY)
import Node.Yargs.Setup (example, usage)

type AllEffs = Eff (cp :: CHILD_PROCESS, console :: CONSOLE, exception :: EXCEPTION, buffer :: BUFFER) Unit

app :: String -> String -> AllEffs
app name pdomUrl = do
                    execCmd $ "echo " <> name
                    log "hello there"

main :: AllEffs
main = do
  let setup = usage "$0 -n Word1 -p Word2"
           <> example "$0 --name testApp --pdom default" "(Create project testApp)"

  runY setup $ app <$> yarg "n" ["names"] (Just "A word") (Right "No Project name mentioned!") true
                   <*> yarg "p" ["pdom"] (Just "Something") (Left "default") true


execCmd :: forall eff. String -> AllEffs
execCmd cmd = exec cmd defaultExecOptions \r -> toString UTF8 r.stdout >>= log