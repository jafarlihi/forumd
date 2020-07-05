package repository

import (
	"github.com/jafarlihi/forumd/database"
	"github.com/jafarlihi/forumd/graph/model"
	"github.com/jafarlihi/forumd/logger"
)

func GetThreads(page int, pageSize int) ([]*model.Thread, error) {
	sql := "SELECT t.id, t.title, t.post_count, t.created_at, u.id, u.username, u.email, u.access, u.avatar, c.id, c.name, c.color FROM threads t LEFT JOIN users u ON t.user_id = u.id LEFT JOIN categories c ON t.category_id = c.id ORDER BY created_at DESC OFFSET $1 LIMIT $2"
	rows, err := database.Database.Query(sql, page*pageSize, pageSize)
	if err != nil {
		logger.Log.Error("Failed to SELECT threads, error: " + err.Error())
		return nil, err
	}
	defer rows.Close()
	threads := make([]*model.Thread, 0)
	for rows.Next() {
		thread := &model.Thread{}
		thread.User = &model.User{}
		thread.Category = &model.Category{}
		if err := rows.Scan(&thread.ID, &thread.Title, &thread.PostCount, &thread.CreatedAt, &thread.User.ID, &thread.User.Username, &thread.User.Email, &thread.User.Access, &thread.User.Avatar, &thread.Category.ID, &thread.Category.Name, &thread.Category.Color); err != nil {
			logger.Log.Error("Failed to scan SELECTed row of threads, error: " + err.Error())
			return nil, err
		}
		threads = append(threads, thread)
	}
	return threads, nil
}
