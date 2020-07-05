package repository

import (
	"github.com/jafarlihi/forumd/database"
	"github.com/jafarlihi/forumd/graph/model"
	"github.com/jafarlihi/forumd/logger"
)

func CreateUser(username string, email string, password string, access int, avatar string) (*model.User, error) {
	sql := "INSERT INTO users (username, email, password, access, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, password, access, avatar"
	user := &model.User{}
	err := database.Database.QueryRow(sql, username, email, password, access, avatar).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Access, &user.Avatar)
	if err != nil {
		logger.Log.Error("Failed to INSERT a new user, error: " + err.Error())
		return nil, err
	}
	return user, nil
}
