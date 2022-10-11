<?php // routes/breadcrumbs.php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;


Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
    $trail->push('Inicio', route('home'));
});

Breadcrumbs::for('repositorios.index', function (BreadcrumbTrail $trail) {
    $trail->parent('home');
    $trail->push('Repositorios', route('repositorios.index'));
});

Breadcrumbs::for('repositorios.show', function (BreadcrumbTrail $trail, $repositorio) {
    $trail->parent('repositorios.index');
    $trail->push($repositorio->nombre_rep, route('repositorios.show', $repositorio->slug));
});


// Repositorios
Breadcrumbs::for('repositorios.user', function (BreadcrumbTrail $trail) {
    $trail->push('Repositorios', route('repositorios.user'));
});

Breadcrumbs::for('repositorios.user.show', function (BreadcrumbTrail $trail, $repositorio) {
    $trail->parent('repositorios.user');
    $trail->push($repositorio->nombre_rep, route('repositorios.user.show', $repositorio));
});

Breadcrumbs::for('repositorios.create', function (BreadcrumbTrail $trail) {
    $trail->parent('repositorios.user');
    $trail->push('Crear', route('repositorios.create'));
});

Breadcrumbs::for('files.create', function (BreadcrumbTrail $trail, $repositorio) {
    $trail->parent('repositorios.user.show', $repositorio);
    $trail->push('Subir arhivos', route('files.create', $repositorio));
});


// Usuarios

Breadcrumbs::for('usuarios.index', function (BreadcrumbTrail $trail) {
    $trail->push('Usuarios', route('usuarios.index'));
});

Breadcrumbs::for('usuarios.create', function (BreadcrumbTrail $trail) {
    $trail->parent('usuarios.index');
    $trail->push('Crear', route('usuarios.create'));
});

Breadcrumbs::for('usuarios.edit', function (BreadcrumbTrail $trail, $usuario) {
    $trail->parent('usuarios.index');
    $trail->push('Editar', route('usuarios.edit', $usuario->id));
});

// Roles

Breadcrumbs::for('roles.index', function (BreadcrumbTrail $trail) {
    $trail->push('Roles', route('roles.index'));
});

Breadcrumbs::for('roles.create', function (BreadcrumbTrail $trail) {
    $trail->parent('roles.index');
    $trail->push('Crear', route('roles.create'));
});

Breadcrumbs::for('roles.edit', function (BreadcrumbTrail $trail, $role) {
    $trail->parent('roles.index');
    $trail->push('Editar', route('roles.edit', $role->id));
});