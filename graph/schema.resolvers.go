package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"io/ioutil"
	"regexp"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/google/uuid"
	avatar "github.com/holys/initials-avatar"
	"github.com/jafarlihi/forumd/config"
	"github.com/jafarlihi/forumd/graph/generated"
	"github.com/jafarlihi/forumd/graph/model"
	"github.com/jafarlihi/forumd/repository"
	"golang.org/x/crypto/bcrypt"
)

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.UserAndToken, error) {
	if !regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`).MatchString(input.Email) {
		return nil, fmt.Errorf("Invalid email")
	}
	if len(input.Password) < 6 {
		return nil, fmt.Errorf("Password shorter than 6")
	}
	// TODO: Check if username has @ symbol
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("Failed to hash the password")
	}
	avatarUUID := uuid.New().String()
	avatarConfig := avatar.Config{
		FontFile: "./public/fonts/monofonto.ttf",
		FontSize: 80,
	}
	a := avatar.NewWithConfig(avatarConfig)
	avatarBytes, _ := a.DrawToBytes(input.Username, 128)
	err = ioutil.WriteFile("./public/avatars/"+avatarUUID, avatarBytes, 0644)
	if err != nil {
		return nil, fmt.Errorf("Failed to create user avatar")
	}
	user, err := repository.CreateUser(input.Username, input.Email, string(passwordHash), 0, avatarUUID)
	if err != nil {
		return nil, fmt.Errorf("Failed to create the user")
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.ID,
	})
	tokenString, err := token.SignedString([]byte(config.Config.Jwt.SigningSecret))
	if err != nil {
		return nil, fmt.Errorf("Failed to create the token")
	}
	userAndToken := &model.UserAndToken{}
	userAndToken.Token = tokenString
	userAndToken.User = user
	return userAndToken, nil
}

func (r *queryResolver) Threads(ctx context.Context, page int, pageSize int) ([]*model.Thread, error) {
	return repository.GetThreads(page, pageSize)
}

func (r *queryResolver) Users(ctx context.Context, page int, pageSize int) ([]*model.User, error) {
	return repository.GetUsers(page, pageSize)
}

func (r *queryResolver) Categories(ctx context.Context) ([]*model.Category, error) {
	return repository.GetCategories()
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
