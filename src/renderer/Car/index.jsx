import { Radio } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  AmbientLight,
  Box3,
  BoxGeometry,
  DirectionalLight,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const modelAry = [
  {
    url: "car",
  },
  {
    url: "lamborghin",
  },
];

const Car = ({}) => {
  const [type, setType] = useState("car");

  const canvasRef = useRef();
  const resizeHandleRef = useRef();

  useEffect(() => {
    if (canvasRef.current) {
      console.log("canvasRef: ", canvasRef);
      //创建渲染器
      const renderer = new WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });

      //创建镜头
      const camera = new PerspectiveCamera(50, 2, 0.1, 500);
      //创建场景
      const scene = new Scene();

      //创建光源
      // const light = new AmbientLight(0xffffff, 1);
      // light.position.set(-1, 2, 4);
      // scene.add(light);

      var point1 = new PointLight("#fff");
      // var point2 = new PointLight("#43A3EF");
      var point2 = new PointLight("#fff");
      // var point3 = new PointLight("#E06C60");
      var point3 = new PointLight("#fff");
      point1.position.set(0, 40, 0); //点光源位置
      point2.position.set(40, 0, 0); //点光源位置
      point3.position.set(-40, 0, 0); //点光源位置
      scene.add(point1); //点光源添加到场景中
      scene.add(point2); //点光源添加到场景中
      scene.add(point3); //点光源添加到场景中

      camera.position.set(0, 15, 0); //设置相机位置

      var loader = new GLTFLoader();
      loader.load(
        `../assets/${type}/scene.gltf`,
        function (gltf) {
          const group = gltf.scene;
          group.rotateY(MathUtils.degToRad(180));
          const box = new Box3().setFromObject(group);
          const center = box.getCenter(new Vector3());

          group.position.x += group.position.x - center.x;
          group.position.y += group.position.y - center.y;
          group.position.z += group.position.z - center.z;
          scene.add(group);
        },
        (Progress) => {
          console.log("Progress: ", Progress);
        },
        function (error) {
          console.log("error: ", error);
        },
      );

      const control = new OrbitControls(camera, canvasRef.current);
      control.update();

      const render = (time) => {
        renderer.setClearColor("#1F2D30", 1);
        renderer.render(scene, camera);
        window.requestAnimationFrame(render);
      };
      window.requestAnimationFrame(render);

      const handleResize = () => {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      };

      handleResize(); //默认打开时，即重新触发一次
      resizeHandleRef.current = handleResize; //将 resizeHandleRef.current 与 useEffect() 中声明的函数进行绑定
      window.addEventListener("resize", handleResize); //添加窗口 resize 事件处理函数
    }
    return () => {
      if (resizeHandleRef && resizeHandleRef.current) {
        window.removeEventListener("resize", resizeHandleRef.current);
      }
    };
  }, [canvasRef, type]);

  return (
    <>
      <Radio.Group
        style={{
          position: "absolute",
          top: 0,
          left: 24,
          zIndex: 9,
        }}
        onChange={(e) => setType(e.target.value)}
        value={type}
      >
        {modelAry.map((e) => (
          <Radio key={e.url} value={e.url}>
            {e.url}
          </Radio>
        ))}
      </Radio.Group>
      <canvas
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        ref={canvasRef}
      />
    </>
  );
};

export default Car;
