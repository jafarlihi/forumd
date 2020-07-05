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

func GetUsers(page int, pageSize int) ([]*model.User, error) {
	sql := "SELECT id, username, email, access, avatar FROM users OFFSET $1 LIMIT $2"
	rows, err := database.Database.Query(sql, page*pageSize, pageSize)
	if err != nil {
		logger.Log.Error("Failed to SELECT users, error: " + err.Error())
		return nil, err
	}
	defer rows.Close()
	users := make([]*model.User, 0)
	for rows.Next() {
		user := &model.User{}
		if err := rows.Scan(&user.ID, user.Username, user.Email, user.Access, user.Avatar); err != nil {
			logger.Log.Error("Failed to scan SELECTed row of threads, error: " + err.Error())
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}
