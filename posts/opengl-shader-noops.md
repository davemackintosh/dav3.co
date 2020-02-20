---
title: My OpenGL ES shader fails to link with no error.
keywords: 
  - opengl
  - c++
  - debugging
excerpt: I'm working on a new cross platform engine for developing visuals on any device. I've spent a few days trying to work out why Linux will compile and run my shaders but not my Android device.
author: davemackintosh
published: Tue 11 Feb 2020 09:27:00 GMT+0000
---

At the beginning of the year I decided instead of trying to start/run/manage tonnes of side projects I was going to focus on one single project at a time. That project is a cross platform visual editing tool that allows you to write Lua on your phone/tablet/computer to interact with an OpenGL ES 3 surface.

As part of that; and being entirely out of my depth with this, the time came to write a shader (or two) to actually rasterise to the screen. This worked great on my laptop (hooray, that was easy) but my phone just wouldn't link my shaders at all and it gave no error, no status codes, nothing.

5 days later, I stumbled across [docs.gl](http://docs.gl) which is *incredible* and alluded straight away to the fact that `glCreateShader(GLEnum)` will return `0` if there's no context in which to create a shader object from. **hallelujah** I had something to go on, I took my setup code from a place where I *thought* my context was fully set up and put it somewhere where I could *guarantee* my openGL context was set up and voila, it worked straight away.

Aside from `glCreateShader` returning 0, all other operations such as `glCreateProgram` are actually no-ops which means they won't/don't error and they don't return anything useful or trigger anything for `glGetError` to pick up. Another reminder that debugging usually means going further back than you think reasonable.

An excerpt from the C++ code that initializes my EGL surface (based on the [Android NDK NativeActivity sample](https://developer.android.com/ndk/samples/sample_na))

```cpp
case APP_CMD_INIT_WINDOW:
  // The window is being shown, get it ready.
  if (engine->app->window != NULL) {
    engine_init_display(engine);

    entryScript->setUserCodePath(exampleProjects.at(2).c_str());
    entryScript->setAssetsPath(scriptStorage->rootPath);
    entryScript->runUserScript();
    entryScript->runSetupFunction();

    engine_draw_frame(engine);
  }
  break;
```

![OpenGL ES 3 multicolour triangle rendered from Lua](https://user-images.githubusercontent.com/1430657/74223569-e6e4db80-4cae-11ea-8042-512844f61edb.png)

The above image is rendered from the below Lua script. It's still very explicit at the moment (more on this as the project develops)

```lua
local shader = Shader:new()
local triangleVertices = {
  -0.5, -0.5, 0.0,
  0.5, -0.5, 0.0,
  0.0, 0.5, 0.0,
}
local triangleColours = {
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  1.0, 0.0, 1.0,
}
local uniforms = {
  angle = 0.1,
}

function setup()
  -- Load the default shader.
  shader:load("default")

  -- Set the vertices for the vertex shader.
  shader:setVertices(triangleVertices)
  shader:setColours(triangleColours)
end

function render()
  -- Clear the screen to this colour.
  GL.Clear(GLConsts.GL_COLOR_BUFFER_BIT)
  GL.ClearColor(0.3, 0.0, 0.3, 1)

  uniforms.angle = uniforms.angle + 0.01
  shader:setUniforms(uniforms)

  -- Run the shander.
  shader:run()

  -- Draw our triangles
  GL.DrawTriangles(#triangleVertices)
end
```

The above script will give you a lovely, slowly spinning, multicoloured triangle on your laptop, phone or tablet.

