package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()
	//router.LoadHTMLGlob("templates/*")
	router.LoadHTMLGlob("dist/*.html")
	router.Static("/static", "dist/static")
	router.Static("/resource", "resource")
	router.StaticFile("/favicon.ico", "dist/favicon.ico")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Main website",
		})
	})
	router.Run(":8080")
}
