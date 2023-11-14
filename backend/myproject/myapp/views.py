from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
from .models import Cliente
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def obtener_clientes(request):
    # Desplegar clientes en caso de acceso GET
    if request.method == "GET":
        lista_clientes = []

        for cliente in Cliente.objects.all():
            lista_clientes.append({
                'id': cliente.id,
                'nombre': cliente.nombre,
            })
            print(lista_clientes)

        # Devuelve los datos en formato JSON como respuesta
        return JsonResponse({'clientes': lista_clientes})

    # Ingresar nuevo cliente en caso de acceso POST
    elif request.method == "POST":
        # obtener datos de json desde POST
        datos = json.loads(request.body.decode('utf-8'))
        nombre = datos["nombre"]

        try:
            c = Cliente(nombre=nombre)
            c.save()
        except Exception as e:
            print(e)  # Esto te dará una idea más clara de qué error está ocurriendo
            respuesta = HttpResponse("Error al ingresar cliente: " + str(e))
            respuesta.status_code = 422  # Error de validación
            return respuesta

        respuesta = HttpResponse("Cliente agregado")
        respuesta.status_code = 200  # Todo OK
        return respuesta
