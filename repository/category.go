package repository

import (
	"github.com/jafarlihi/forumd/database"
	"github.com/jafarlihi/forumd/graph/model"
	"github.com/jafarlihi/forumd/logger"
)

func GetCategories() ([]*model.Category, error) {
	sql := "SELECT id, name, color FROM categories"
	rows, err := database.Database.Query(sql)
	if err != nil {
		logger.Log.Error("Failed to SELECT categories, error: " + err.Error())
		return nil, err
	}
	defer rows.Close()
	categories := make([]*model.Category, 0)
	for rows.Next() {
		category := &model.Category{}
		if err := rows.Scan(&category.ID, &category.Name, &category.Color); err != nil {
			logger.Log.Error("Failed to scan SELECTed row of categories, error: " + err.Error())
			return nil, err
		}
		categories = append(categories, category)
	}
	return categories, nil
}
