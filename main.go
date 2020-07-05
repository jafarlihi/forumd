package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/jafarlihi/forumd/config"
	"github.com/jafarlihi/forumd/database"
	"github.com/jafarlihi/forumd/graph"
	"github.com/jafarlihi/forumd/graph/generated"
	"github.com/jafarlihi/forumd/logger"
	"log"
	"net/http"
)

const defaultPort = "8080"

func main() {
	logger.InitLogger()
	config.InitConfig()
	database.InitDatabase()

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", config.Config.Server.Port)
	log.Fatal(http.ListenAndServe(":"+config.Config.Server.Port, nil))
}
