---
title: How to loop over a Lua arraytable in C/C++
keywords: 
  - C
  - C++
  - Lua
  - Loop
  - Iterate
excerpt: Took me a while to figure it out and a lot of non-helpful Googling but looping over a table from Lua using the C API turns out to be pretty simple although not intuitive at all.
author: davemackintosh
published: 2020-01-23T11:21:46.287Z
---

So I'm making a cross platform OpenGL editor where you write Lua and you get an OpenGL ES 2 surface to do your drawing on. I'm manually writing each of these APIs and helpers and in my travels found that I wanted to send a table of vertices to the GPU (for drawing, obviously).

Once this reached C land... how do you iterate over a Lua table in C?

Well, after some faffing around with some implementations I found in mailing lists and in StackOverflow none of those worked so I hit the Lua source and manual to see what exactly what each function was doing.

They weren't doing what we wanted, or at least not in the language we expect it to.

To loop over a table in Lua you need to write your loop like this.

```cpp
static int SendVertices(lua_State *L) {
  if (!lua_istable(L, -1)) {
    LOGE("Expected a table of vertices, got %s", lua_typename(L, lua_type(L, -1)));
    return 1;
  }

  // Get the number of vertices we received.
  size_t len = lua_rawlen(L, -1);
  double vertices[len];

  for (int index = 0; index <= len; index++) {
    // Our actual index will be +1 because Lua 1 indexes tables.
    int actualIndex = index + 1; 
    // Push our target index to the stack.
    lua_pushinteger(L, actualIndex);
    // Get the table data at this index (and not get the table, which is what I thought this did.)
    lua_gettable(L, -2); 
    // Check for the sentinel nil element.
    if (lua_type(L, -1) == LUA_TNIL) break; 
    // Get it's value.
    vertices[index] = luaL_checknumber(L, -1);
    // Pop it off again.
    lua_pop(L, 1);
  }

  glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, vertices);
  glEnableVertexAttribArray(0);

  return 0;
}

```

That's it, push the index you want to read and then read and pop the value as you require.

