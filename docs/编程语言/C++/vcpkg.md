# vcpkg

官网：https://learn.microsoft.com/zh-cn/vcpkg/



`vcpkg` 是一个开源的 C++ 包管理工具，由 Microsoft 开发和维护。它旨在简化跨平台库的获取和管理，并且可以轻松集成到 CMake、MSBuild 和其他构建系统中。

特点：使用广泛、跨平台、大量库支持、易于集成

其他包管理器：`Conan`  & ` Hunter ` & ` Spack `

**vcpkg** - 大约占据 45% 的市场份额。

**Conan** - 大约占据 35% 的市场份额。

**Hunter** - 大约占据 10% 的市场份额。

**Buck** - 大约占据 5% 的市场份额。

**Build2** - 大约占据 5% 的市场份额。

## 主要功能

**跨平台支持**：支持 Windows、macOS 和 Linux。

**简化依赖管理**：自动解决和安装库依赖。

**丰富的库集合**：包含数千个 C++ 库，涵盖广泛的功能和需求。

**与现有工具链的集成**：可与 CMake、MSBuild 和 Visual Studio 无缝集成。

## 使用 vcpkg

安装库

`vcpkg install boost`

列出以安装的库

` vcpkg list `

搜索库

`vcpkg search <library_name>`



## 与CMake集成







##  vcpkg.json 

 `vcpkg` 支持通过 `vcpkg.json` 文件来管理项目的依赖关系，这类似于其他包管理器（如 npm 的 `package.json` 或 Python 的 `requirements.txt`） 

示例

```
{
  "name": "myproject",
  "version": "1.0.0",
  "dependencies": [
    "fmt",
    "boost"
  ]
}
```

自动解析并且安装这些库

` vcpkg install --triplet x64-windows `















