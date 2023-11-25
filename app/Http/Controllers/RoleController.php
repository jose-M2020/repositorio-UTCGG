<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveRoleRequest;
use Facade\FlareClient\View;
use Illuminate\Http\Request;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    function __construct()
    {
         $this->middleware('can:roles.index')->only('index');
         $this->middleware('can:roles.create')->only('create','store');
         $this->middleware('can:roles.edit')->only('edit','update');
         $this->middleware('can:roles.delete')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::paginate(10);

        return View('roles.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permisos = $this->getPermisos();

        return view('roles.create', compact('permisos'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SaveRoleRequest $request)
    {
        $role = Role::create($request->validated());
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')
            ->with('status','Rol creado exitosamente!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        $permisos = $this->getPermisos();

        return view('roles.edit', compact('role','permisos'));
    }

    private function extractString($string, $character)
    {
        return substr($string, 0, strpos($string, $character));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SaveRoleRequest $request, Role $role)
    {
        $role->update($request->validated());
        $role->syncPermissions($request->permissions);

        return redirect()->route('roles.index')
            ->with('status','Rol actualizado exitosamente!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()->route('roles.index')
            ->with('status','Rol eliminado exitosamente!');
    }

    private function getPermisos()
    {
        $allPermissions = Permission::all();
        $permisos = [];
        
        foreach($allPermissions as $permiso){
            $name = $this->extractString($permiso->name, '.');

            if(array_key_exists($name, $permisos)){
                array_push($permisos[$name], $permiso);
            }else{
                $permisos[$name] = [$permiso];
            }
        }

        return $permisos;
    }
}
