CREATE DATABASE SCUSAC;
GO

USE SCUSAC;
GO

CREATE TABLE Usuario(
	Carne INT PRIMARY KEY NOT NULL,
	Nombres VARCHAR(45)NOT NULL,
	Apellidos VARCHAR (45) NOT NULL,
	Contrasenia VARCHAR (45) NOT NULL,
	Correo VARCHAR(45) NOT NULL
)
GO

CREATE TABLE Curso(
	Codigo INT PRIMARY KEY NOT NULL,
	Nombre VARCHAR (100) NOT NULL
)
GO

CREATE TABLE Carrera(
	id INT PRIMARY KEY NOT NULL,
	Nombre VARCHAR (100) NOT NULL
)
GO

CREATE TABLE Catedratico(
	id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	Nombres VARCHAR(45)NOT NULL,
	Apellidos VARCHAR (45) NOT NULL
)
GO

CREATE TABLE CursoCatedratico(
	Correlativo INT IDENTITY (1,1) PRIMARY KEY NOT NULL,
	CodigoCurso INT NOT NULL,
	idCatedratico INT NOT NULL,
	FOREIGN KEY (CodigoCurso) REFERENCES Curso(Codigo),
	FOREIGN KEY (idCatedratico) REFERENCES Catedratico(id)
)
GO

CREATE TABLE Pensum(
	idCursoPensum INT IDENTITY (1,1) PRIMARY KEY NOT NULL,
	CodigoCurso INT NOT NULL,
	idCarrera INT NOT NULL,
	Creditos INT NOT NULL,
	Semestre INT NOT NULL,
	FOREIGN KEY (CodigoCurso) REFERENCES Curso(Codigo),
	FOREIGN KEY (idCarrera) REFERENCES Carrera(id)
)
GO

CREATE TABLE CursosAprobados(
	CarneUsuario INT NOT NULL,
	idCursoPen INT NOT NULL,
	NotaAprobada INT NOT NULL,
	FOREIGN KEY (CarneUsuario) REFERENCES Usuario(Carne),
	FOREIGN KEY (idCursoPen) REFERENCES Pensum(idCursoPensum),
	--PRIMARY KEY (CarneUsuario, idCursoPen)
)
GO

CREATE TABLE Publicacion(
	Correlativo INT IDENTITY (1,1) PRIMARY KEY NOT NULL,
	Mensaje VARCHAR (200) NOT NULL,
	Tipo INT NOT NULL,
	Fecha DATE NOT NULL,
	CarneUsuario INT NOT NULL,
	CodigoCurso INT,
	idCatedratico INT,
	CorrelCursoCated INT,
	FOREIGN KEY (CarneUsuario) REFERENCES Usuario(Carne),
	FOREIGN KEY (CodigoCurso) REFERENCES Curso(Codigo),
	FOREIGN KEY (idCatedratico) REFERENCES Catedratico(id),
	FOREIGN KEY (CorrelCursoCated) REFERENCES CursoCatedratico(Correlativo)
)
GO

CREATE TABLE Comentario(
	id INT IDENTITY (1,1) NOT NULL,
	Mensaje VARCHAR (200) NOT NULL,
	CarneUsuario INT NOT NULL,
	CorrelPubli INT	NOT NULL,
	FOREIGN KEY (CarneUsuario) REFERENCES Usuario(Carne),
	FOREIGN KEY (CorrelPubli) REFERENCES Publicacion(Correlativo)
)
GO