from flask import Flask, render_template, request, send_file
import openai
from pptx import Presentation
from dotenv import load_dotenv
from pptx.util import Inches
import io
import os

openai_api_key = os.environ.get("OPENAI_API_KEY")
load_dotenv()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def generate_class_plan(topic, duration):
    prompt = f"Crear un plan de clase para el tema '{topic}' con una duración de {duration} minutos."

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.5,
    )

    return response.choices[0].text.strip()

def generate_presentation(topic, plan_text):
    # Crea una nueva presentación
    ppt = Presentation()

    # Añade una diapositiva de título
    title_slide = ppt.slide_layouts[0]
    slide = ppt.slides.add_slide(title_slide)
    title = slide.shapes.title
    subtitle = slide.placeholders[1]

    title.text = "Clase: " + topic
    subtitle.text = "Plan de clase generado automáticamente"

    # Divide el plan de clase en puntos
    points = plan_text.split("\n")

    # Añade una diapositiva para cada punto
    for point in points:
        bullet_slide = ppt.slide_layouts[1]
        slide = ppt.slides.add_slide(bullet_slide)

        shapes = slide.shapes
        title_shape = shapes.title
        body_shape = shapes.placeholders[1]

        title_shape.text = topic
        text_frame = body_shape.text_frame
        text_frame.text = point

    # Guarda la presentación en un objeto BytesIO
    presentation_data = io.BytesIO()
    ppt.save(presentation_data)
    presentation_data.seek(0)

    return presentation_data


@app.route('/generate', methods=['POST'])
def generate():
    topic = request.form['topic']
    duration = request.form['duration']

    # Genera el plan de clase
    class_plan = generate_class_plan(topic, duration)

    # Genera la presentación
    presentation_data = generate_presentation(topic, class_plan)

    # Envía la presentación como archivo descargable
    return send_file(
        presentation_data,
        download_name=f"{topic}_presentation.pptx",
        as_attachment=True,
    )


if __name__ == '__main__':
    app.run(debug=True)
