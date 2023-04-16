#!/bin/bash

echo "SCRIPT PATH: $SCRIPT_PATH"

CMD_BASE64="node $SCRIPT_PATH/scripts/base64.js"
case $1 in

  structure)
    echo "Structure."

    #klaudsol-commons structrue.sql
    for structure in $(ls $SCRIPT_PATH/db/structure/*.sql); do
      echo "Running ${structure}..."
      cat $structure | node $SCRIPT_PATH/scripts/db.js structure
    done

    # Per-project structure.sql (Optional)
    if [[ -f db/structure.sql ]]; then
      echo "Running db/structure.sql"
      cat db/structure.sql | node $SCRIPT_PATH/scripts/db.js
    else
      echo "db/structure.sql not found for this project."
    fi
    ;;

  seed)
    echo "Seed."
    #Seeds must be only run in the initial setup.
    #Seeds contains necessary built-in data.
    #Can be manually overriden by settitng KS_SKIP_DB_SEED=1
    SKIP_DB_SEED_FROM_ENV=$KS_SKIP_DB_SEED
    SKIP_DB_SEED_FROM_DB=$(node $SCRIPT_PATH/scripts/system.js get skip_db_seed)

    #No skips. Proceed.
    if [[ -z $SKIP_DB_SEED_FROM_ENV ]] && [[ -z $SKIP_DB_SEED_FROM_DB ]]; then 

      #klaudsol-commons seed
      for seed in $(ls $SCRIPT_PATH/db/seed/*.sql); do
        echo "Running ${seed}..."
        cat $seed | node $SCRIPT_PATH/scripts/db.js 
      done

      # Per-project seed.sql (Optional)
      if [[ -f db/seed.sql ]]; then
        echo "Running db/structure.sql"
        cat db/seed.sql | node $SCRIPT_PATH/scripts/db.js
      else
        echo "db/seed.sql not found for this project."
      fi

      node $SCRIPT_PATH/scripts/system.js add skip_db_seed 1

    elif [[ -n $SKIP_DB_SEED_FROM_ENV ]]; then 
      echo "Skipping seed. \$KS_SKIP_DB_SEED=${SKIP_DB_SEED_FROM_ENV}"
    elif [[ -n $SKIP_DB_SEED_FROM_DB ]]; then 
      echo "Skipping seed. system.skip_db_seed=${SKIP_DB_SEED_FROM_DB}"
    fi
    ;;

  seed-demo)
    echo "Seed demo."
    #Seed-demo contains sample data as onboarding guide for newcomers.
    #This may be skipped by more advanced users.
    #Can be manually overriden by settitng KS_SKIP_DB_SEED_DEMO=1
    SKIP_DB_SEED_DEMO_FROM_ENV=$KS_SKIP_DB_SEED_DEMO
    SKIP_DB_SEED_DEMO_FROM_DB=$(node $SCRIPT_PATH/scripts/system.js get skip_db_seed_demo)

    #No skips. Proceed.
    if [[ -z $SKIP_DB_SEED_DEMO_FROM_ENV ]] && [[ -z $SKIP_DB_SEED_DEMO_FROM_DB ]]; then 
      cat db/seed-demo.sql | node $SCRIPT_PATH/scripts/db.js structure
      node $SCRIPT_PATH/scripts/system.js add skip_db_seed_demo 1
    elif [[ -n $SKIP_DB_SEED_DEMO_FROM_ENV ]]; then 
      echo "Skipping seed. \$KS_SKIP_DB_SEED_DEMO=${SKIP_DB_SEED_DEMO_FROM_ENV}"
    elif [[ -n $SKIP_DB_SEED_DEMO_FROM_DB ]]; then 
      echo "Skipping seed. system.skip_db_seed_demo=${SKIP_DB_SEED_DEMO_FROM_DB}"
    fi
    ;;

  migrate)
    echo "Migrate."
    echo '{"data": []}' > /tmp/migrate-acc.json


    #Reduce all migration fiels in one big fie - KlaudSol Commons
    for migration in $(ls $SCRIPT_PATH/db/migrations/*); do
      BASENAME=$(basename $migration)
      echo "{\"filename\": \"$BASENAME\"}" > /tmp/migrate-filename.json
      echo $($SCRIPT_PATH/scripts/base64cat.sh /tmp/migrate-acc.json $migration /tmp/migrate-filename.json | node $SCRIPT_PATH/scripts/migrations-reducer.js) > /tmp/migrate-acc.json
    done

    #Reduce all migration files in one big file - Project Specific
    for migration in $(ls db/migrations/*); do
      BASENAME=$(basename $migration)
      echo "{\"filename\": \"$BASENAME\"}" > /tmp/migrate-filename.json
      echo $($SCRIPT_PATH/scripts/base64cat.sh /tmp/migrate-acc.json $migration /tmp/migrate-filename.json | node $SCRIPT_PATH/scripts/migrations-reducer.js) > /tmp/migrate-acc.json
    done

    #Feed the big file into our migrations processor
    cat /tmp/migrate-acc.json | node $SCRIPT_PATH/scripts/migrations-processor.js
    ;;

    *)
    echo "Usage: db.sh [ structure | seeds | migrate ]"
    ;;
esac