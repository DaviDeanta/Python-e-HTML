from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime

app = Flask(__name__)

# Dados de exemplo para demonstração
tasks = [
    {"id": 1, "title": "Aprender Python", "completed": False, "created_at": "2024-01-15"},
    {"id": 2, "title": "Criar projeto web", "completed": True, "created_at": "2024-01-16"},
    {"id": 3, "title": "Implementar API", "completed": False, "created_at": "2024-01-17"}
]

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = {
        "id": len(tasks) + 1,
        "title": data['title'],
        "completed": False,
        "created_at": datetime.now().strftime("%Y-%m-%d")
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    for task in tasks:
        if task['id'] == task_id:
            task['title'] = data.get('title', task['title'])
            task['completed'] = data.get('completed', task['completed'])
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Task deleted successfully"})

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    try:
        a = float(data['a'])
        b = float(data['b'])
        operation = data['operation']
        
        if operation == 'add':
            result = a + b
        elif operation == 'subtract':
            result = a - b
        elif operation == 'multiply':
            result = a * b
        elif operation == 'divide':
            if b == 0:
                return jsonify({"error": "Division by zero"}), 400
            result = a / b
        else:
            return jsonify({"error": "Invalid operation"}), 400
            
        return jsonify({"result": result})
    except (ValueError, KeyError):
        return jsonify({"error": "Invalid input"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
